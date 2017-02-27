import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import SplashScreen from 'react-native-splash-screen';

// Services
import WordPress from '../services/WordPress';
import MapBox from '../services/MapBox';
// Models
import Tour from '../models/Tour';
import TourPlace from '../models/TourPlace';
import Location from '../models/Location';
import Preference from '../models/Preference';

// Utils
import Utils from '../utils';

// Components
import Header from './Header';
import TourMap from './TourMap/index';
import TourPlaceList from './TourPlaceList';
import TourList from './TourList';
import About from './About';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 0.92,
    },
});

const Entities = require('html-entities').XmlEntities;

export default class CuriousEdinburgh extends Component {
    constructor() {
        super();
        this.entities = new Entities();
        this.state = { tours: [], selectedTour: null };
        this.changeSelectedTour = this.changeSelectedTour.bind(this);
    }
    componentDidMount() {
        WordPress.getCategories().then((categories) => {
            const tours = categories.map(
                category =>
                    new Tour({ id: category.id.toString(),
                        name: category.name,
                        description: category.description,
                        slug: category.slug }));
            this.setState({ tours });
            Preference.getTourId().then(tourId => this.changeSelectedTour(tourId));
            if (Platform.OS === 'android') {
                SplashScreen.hide();
            }
        });
    }
    componentWillUpdate(nextProps, nextState) {
        if (this.state.selectedTour !== nextState.selectedTour) {
            Preference.setTourId(nextState.selectedTour.id);
        }
    }
    changeSelectedTour(tourId) {
        let tour = this.state.tours.find(element => element.id === tourId);
        if (tour !== undefined) {
            if (tour.tourPlaces.length > 0) {
                this.setState({ selectedTour: tour });
            } else {
                WordPress.getPostsFromCategory(tourId).then((posts) => {
                    const tourPlaces = posts.map(post =>
                        new TourPlace({
                            id: post.id.toString(),
                            title: post.custom_fields.OSM_Marker_01_Name,
                            description: this.entities.decode(post.custom_fields.main_text),
                            images: Utils.getURLsFromHTMLImage(post.content.rendered),
                            location: new Location({
                                latitude: parseFloat(post.custom_fields.latitude),
                                longitude: parseFloat(post.custom_fields.longitude) }),
                            streetAddress: post.custom_fields.street_address,
                            additionalLinks:
                            Utils.getURLsFromPipeString(post.custom_fields.additional_links),
                            stop:
                            Utils.getTourStopFromSlug(tour.slug, post.custom_fields.tour_stops),
                        }));
                    tourPlaces.sort((a, b) => a.stop - b.stop); // sort places by tour stop
                    MapBox.getDirections(tourPlaces.map(value => value.location))
                        .then((data) => {
                            tour = Object.assign(new Tour(), tour,
                                { tourPlaces, directions: data });
                            const tourIndex = this.state.tours
                                .findIndex(element => element.id === tourId);
                            this.setState({ tours:
                                this.state.tours.slice(0, tourIndex)
                                .concat([tour])
                                .concat(this.state.tours.slice(tourIndex + 1)),
                                selectedTour: tour });
                        }, error => console.log(error));
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
