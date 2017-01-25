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
import TourList from './TourList';
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
        this.changeSelectedTour = this.changeSelectedTour.bind(this);
    }
    componentDidMount() {
        WordPress.getCategories().then((categories) => {
            const tours = categories.map(
                category =>
                    new Tour(category.id.toString(), category.name, category.description));
            this.setState({ tours });
            // Following statement will be modified when tackling issue #25
            this.changeSelectedTour(constants.DEFAULT_TOUR_ID);
        });
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate(%o, %o)', nextProps, nextState);
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
                            location: new Location(parseFloat(post.custom_fields.latitude),
                                parseFloat(post.custom_fields.longitude)),
                            streetAddress: post.custom_fields.street_address,
                            additionalLinks:
                            Utils.getURLsFromPipeString(post.custom_fields.additional_links),
                        }));
                    const tourIndex = this.state.tours.findIndex(element => element.id === tourId);
                    tour = Object.assign(new Tour(), tour, { tourPlaces });
                    this.setState({ tours:
                        this.state.tours.slice(0, tourIndex)
                        .concat([tour])
                        .concat(this.state.tours.slice(tourIndex + 1)),
                        selectedTour: tour });
                });
            }
        }
    }
    render() {
        const tourPlaces = (this.state.selectedTour !== null ?
            this.state.selectedTour.tourPlaces : []);
        return (
          <View style={styles.container}>
            <Text>Header</Text>
            <ScrollableTabView tabBarPosition="bottom">
              <TourMap
                tabLabel="Map"
                tourPlaces={tourPlaces}
              />
              <TourPlaceList
                tabLabel="List"
                tourPlaces={tourPlaces}
              />
              <TourList
                tabLabel="Tour List"
                tours={this.state.tours}
                selectedValue={this.state.selectedTour !== null ?
                    this.state.selectedTour.id : ''}
                onValueChange={this.changeSelectedTour}
              />
              <About tabLabel="About" />
            </ScrollableTabView>
          </View>
        );
    }
}
