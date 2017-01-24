import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

// Services
import WordPress from '../services/WordPress';

// Models
import Tour from '../models/Tour';
import TourPlace from '../models/TourPlace';
import Location from '../models/Location';

// Utils
import Utils from '../utils';

// Constants
import * as constants from '../constants';

// Components
import TourMap from './TourMap';
import TourPlaceList from './TourPlaceList';
import About from './About';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const Entities = require('html-entities').XmlEntities;

export default class CuriousEdinburgh extends Component {
    constructor() {
        super();
        this.entities = new Entities();
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
    componentWillUpdate() {
        // console.log(this.state);
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
                        new TourPlace({
                            id: post.id.toString(),
                            title: post.custom_fields.OSM_Marker_01_Name,
                            description: this.entities.decode(post.custom_fields.main_text),
                            images: Utils.getURLsFromHTMLImage(post.content.rendered),
                            location: new Location(parseFloat(post.custom_fields.latitude),
                                parseFloat(post.custom_fields.longitude)),
                            streetAddress: post.custom_fields.street_address,
                            additionalLinks:
                            Utils.getURLsFromPipeString(post.custom_fields.additional_links),
                        }));
                    this.setState({ selectedTour: newTour });
                });
            }
        }
    }
    render() {
        const selectedTour = (this.state.selectedTour !== null ?
                            this.state.selectedTour.tourPlaces : []);
        return (
          <View style={styles.container}>
            <Text>Header</Text>
            <ScrollableTabView tabBarPosition="bottom">
              <TourMap
                tabLabel="Map"
                tourPlaces={selectedTour}
              />
              <TourPlaceList
                tabLabel="List"
                tourPlaces={selectedTour}
              />
              <About tabLabel="About" />
            </ScrollableTabView>
          </View>
        );
    }
}
