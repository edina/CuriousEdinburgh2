import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import SplashScreen from 'react-native-splash-screen';

// Services
import WordPress from 'services/WordPress';
import MapBox from 'services/MapBox';
// Models
import Tour from 'models/Tour';
import Preference from 'models/Preference';
// Components
import Header from 'components/Header';
import TourMap from 'components/TourMap/index';
import TourPlaceList from 'components/TourPlaceList';
import TourList from 'components/TourList';
import About from 'components/About';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 0.91,
    },
});

export default class CuriousEdinburgh extends Component {
    constructor() {
        super();
        this.state = { tours: [], selectedTour: null };
        this.changeSelectedTour = this.changeSelectedTour.bind(this);
    }
    componentDidMount() {
        WordPress.getTours()
            .then((tours) => {
                this.setState({ tours });
                SplashScreen.hide();
            }, (error) => {
                SplashScreen.hide();
                Alert.alert('WordPress tours', error.toString());
            });
    }
    componentWillUpdate(nextProps, nextState) {
        if (this.state.selectedTour !== nextState.selectedTour) {
            Preference.setTourId(nextState.selectedTour.id);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedTour === null) {
            Preference.getTourId().then(tourId => this.changeSelectedTour(tourId));
        }
        // changeSelectedTour needs adequate testing
    }
    changeSelectedTour(tourId) {
        const tour = this.state.tours.find(e => e.id === tourId);
        if (tour) {
            if (tour.tourPlaces.length > 0) {
                this.setState({ selectedTour: tour });
            } else {
                WordPress.getTourPlaces(tour).then((tourPlaces) => {
                    const locations = tourPlaces.map(value => value.location);
                    const index = this.state.tours.findIndex(e => e.id === tourId);
                    MapBox.getDirections(locations)
                        .then((directions) => {
                            const newTour = Object.assign(
                                new Tour(), tour, { tourPlaces, directions });
                            const newTours = this.state.tours.slice(0, index)
                                .concat([newTour])
                                .concat(this.state.tours.slice(index + 1));
                            this.setState({ tours: newTours, selectedTour: newTour });
                        }, (error) => {
                            const newTour = Object.assign(
                                new Tour(), tour, { tourPlaces });
                            const newTours = this.state.tours.slice(0, index)
                                .concat([newTour])
                                .concat(this.state.tours.slice(index + 1));
                            this.setState({ tours: newTours, selectedTour: newTour });
                            Alert.alert('Mapbox directions', error.toString());
                        });
                }, (error) => {
                    Alert.alert('WordPress tour places', error.toString());
                });
            }
        }
    }
    render() {
        const tourPlaces = (this.state.selectedTour !== null ?
            this.state.selectedTour.tourPlaces : []);
        return (
          <View style={styles.container}>
            <Header title={this.state.selectedTour != null ? this.state.selectedTour.name : 'Loading...'}>
              <TourList
                tours={this.state.tours}
                selectedValue={this.state.selectedTour !== null ?
                    this.state.selectedTour.id : ''}
                onValueChange={this.changeSelectedTour}
              />
            </Header>
            <ScrollableTabView
              tabBarPosition="bottom"
              style={styles.body}
              ref={(tabView) => { this.tabView = tabView; }}
            >

              <TourMap
                tabLabel="Map"
                tour={this.state.selectedTour || undefined}
              />
              <TourPlaceList
                tabLabel="List"
                tourPlaces={tourPlaces}
              />
              <About
                tabLabel="About"
                tabView={this.tabView}
                onValueChange={this.changeSelectedTour}
              />
            </ScrollableTabView>
          </View>
        );
    }
}
