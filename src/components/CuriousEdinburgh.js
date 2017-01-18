import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TourMap from './TourMap';
// Services
import WordPress from '../services/WordPress';
// Models
import Tour from '../models/Tour';
import TourPlace from '../models/TourPlace';
import Location from '../models/Location';
// Constants
import * as constants from '../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class CuriousEdinburgh extends Component {
    constructor() {
        super();
        this.state = { tours: [], selectedTour: null };
    }
    componentDidMount() {
        WordPress.getCategories().then((categories) => {
            const tours = categories.map(
                category =>
                    new Tour(category.id.toString(), category.name, category.description));
            const selectedTour = tours.find(value => value.name === constants.DEFAULT_TOUR_NAME);
            this.setState({ tours, selectedTour }); // Shorthand syntax for properties
            // where key name matches name of the assigned variable
            this.changeSelectedTour(selectedTour.id);
        });
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('CuriousEdinburgh.componentWillUpdate - nextState: %o', nextState);
    }
    changeSelectedTour(tourId) {
        const found = this.state.tours.find(element => element.id === tourId);
        if (found !== undefined) {
            if (found.tourPlaces.length > 0) {
                this.setState({ selectedTour: found });
            } else {
                WordPress.getPostsFromCategory(tourId).then((posts) => {
                    const newTour = Object.assign(new Tour(), found);
                    newTour.tourPlaces = posts.map(post =>
                        new TourPlace(post.id.toString(),
                            post.custom_fields.OSM_Marker_01_Name,
                            post.custom_fields.main_text,
                            null, // image TODO probably through RegEx
                            new Location(parseFloat(post.custom_fields.latitude),
                                parseFloat(post.custom_fields.longitude))));
                    this.setState({ selectedTour: newTour });
                });
            }
        }
    }
    render() {
        return (
          <View style={styles.container}>
            <Text>Header</Text>
            <ScrollableTabView tabBarPosition="bottom">
              <TourMap
                tabLabel="Map"
                tourPlaces={this.state.selectedTour !== null &&
                    Array.isArray(this.state.selectedTour.tourPlaces) ?
                    this.state.selectedTour.tourPlaces : []}
              />
              <Text tabLabel="List">TODO List</Text>
              <Text tabLabel="About">TODO About</Text>
            </ScrollableTabView>
          </View>
        );
    }
}
