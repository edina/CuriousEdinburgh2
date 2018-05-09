import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import SplashScreen from 'react-native-splash-screen';

// Services
import WordPress from '../services/WordPress';
import MapBox from '../services/MapBox';
// Models
import Tour from '../models/Tour';
import Preference from '../models/Preference';
// Components
import Header from './Header';
import TourMap from './TourMap/index';
import TourPlaceList from './TourPlaceList';
import TourList from './TourList';
import About from './About';

import Utils from '../utils';
import styles from './styles/CuriousEdinburgh';

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
    componentDidUpdate() {
        if (this.state.selectedTour === null) {
            Preference.getTourId().then(tourId => this.changeSelectedTour(tourId));
        }
    }
    changeSelectedTour(tourId) {
        const tour = this.state.tours.find(e => e.id === tourId);
        if (tour) {
            if (tour.tourPlaces.length > 0) {
                if (Utils.isAndroid()) {
                    // temporary workaround for
                    // https://github.com/edina/CuriousEdinburgh2/issues/75
                    setTimeout(() => {
                        this.setState({ selectedTour: tour });
                    }, 100);
                } else {
                    this.setState({ selectedTour: tour });
                }
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
                        }, () => {
                            const newTour = Object.assign(
                                new Tour(), tour, { tourPlaces });
                            const newTours = this.state.tours.slice(0, index)
                                .concat([newTour])
                                .concat(this.state.tours.slice(index + 1));
                            this.setState({ tours: newTours, selectedTour: newTour });
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
            <Header
              title={this.state.selectedTour != null ? this.state.selectedTour.name : 'Loading...'}
              tourListTours={this.state.tours}
              tourListSelectedValue={this.state.selectedTour !== null ?
                    this.state.selectedTour.id : ''}
              okButtonFunction={this.changeSelectedTour}
            />
            <ScrollableTabView
              tabBarPosition="bottom"
              style={styles.body}
              ref={(tabView) => { this.tabView = tabView; }}
              tabBarTextStyle={{ fontSize: 16 }}
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
                tours={this.state.tours}
                tabView={this.tabView}
                onValueChange={this.changeSelectedTour}
              />
            </ScrollableTabView>
          </View>
        );
    }
}
