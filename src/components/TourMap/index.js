import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, TouchableHighlight, Alert } from 'react-native';
import MapView from 'react-native-maps';
import Tour from '../../models/Tour';
import TourPlaceCallout from '../TourMap/TourPlaceCallout';
import TourRecord from '../TourRecord';
import Geolocation from '../../services/Geolocation';
import Utils from '../../utils';
import styles from '../styles/index';

const locationOff = require('assets/location_off.png');
const locationOn = require('assets/location_on.png');
const routingOff = require('assets/routing_off.png');
const routingOn = require('assets/routing_on.png');

/**
 * A component which acts as the map where markers are shown.
 */
export default class TourMap extends Component {
    constructor(props) {
        super(props);
        this.mapRef = null;
        this.markers = {}
        this.modal = null;
        this.geolocation = new Geolocation();
        this.onMarkerPressed = this.onMarkerPressed.bind(this);
        this.onCalloutPress = this.onCalloutPress.bind(this);
        this.toggleRouting = this.toggleRouting.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.state = { showLocation: false, showRouting: false };
    }

    componentDidMount() {
        this.fitToSuppliedMarkers();
        this.geolocation.watchPosition().then(
            () => {
                if (this.state.showLocation) {
                    this.setState({ showLocation: false });
                }
            },
            () => {},
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.tour.tourPlaces !== this.props.tour.tourPlaces ||
            nextProps.tour.direction !== this.props.tour.direction ||
            nextState.showLocation !== this.state.showLocation ||
            nextState.showRouting !== this.state.showRouting;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tour.tourPlaces !== this.props.tour.tourPlaces) {
            this.fitToSuppliedMarkers();
        }
    }

    componentWillUnmount() {
        this.geolocation.clearWatch();
    }

    onCalloutPress(tourPlace) {
        this.modal.show(tourPlace);
    }

    /**
     * When a `TourPlace` `MapMarker` is pressed, make sure it is elevated above all other tour
     * places on iOS.
     * Do nothing on Android.
     * @param index The `index` value of the pressed `MapMarker`
     */
    onMarkerPressed(index) {
        const calloutRef = `callout-${index}`;
        const marker = this.markers[calloutRef];
        marker.setNativeProps({ zIndex: index });
        this.setState({ selectedCalloutIndex: index });
    }

    getMapMarkers() {
        return this.props.tour.tourPlaces.map((tourPlace, index) =>
          <MapView.Marker
            key={tourPlace.randomId}
            identifier={tourPlace.randomId}
            // ref={`callout-${index}`}
            ref={(ref) => { this.markers[`callout-${index}`] = ref; }}
            coordinate={{ latitude: tourPlace.location.latitude,
                longitude: tourPlace.location.longitude }}
            onPress={() => this.onMarkerPressed(index)}
            onCalloutPress={() => { this.onCalloutPress(tourPlace); }}
            zIndex={this.state.selectedCalloutIndex === index ? 999 : 0}
          >
            <Text style={styles.marker}>{tourPlace.stop}</Text>
            <MapView.Callout tooltip style={{ width: 200 }}>
              <TourPlaceCallout
                title={tourPlace.title}
                description={tourPlace.getShortDescription(100)}
              />
            </MapView.Callout>
          </MapView.Marker>);
    }

    fitToSuppliedMarkers() {
        if (this.mapRef !== null) {
            const markerIDs = this.props.tour.tourPlaces.map(tourPlace =>
              tourPlace.randomId);
            this.mapRef.fitToSuppliedMarkers(markerIDs, false);
        }
    }

    fitToCoordinates(coordinates) {
        if (this.mapRef !== null) {
            this.mapRef.fitToCoordinates([coordinates],
                { edgePadding: { top: 0, right: 0, bottom: 0, left: 0 }, animated: true });
        }
    }

    /**
     * Method to update location on the map.
     * Used when the user clicks on the top right showLocation button.
     *
     * updateLocation() only sets to true showLocation if and only if
     * the current position has changed. Updating showLocation to false is determined
     * by geolocation.watchPosition (see componentDidMount method).
    */
    updateLocation() {
        if (!this.state.showLocation) {
            Geolocation.getCurrentPosition().then(
                (data) => {
                    this.setState({ showLocation: true });
                    this.fitToCoordinates(data);
                },
                error => Alert.alert('Geolocation error', error.statusText),
            );
        }
    }

    toggleRouting() {
        this.setState({ showRouting: !this.state.showRouting });
    }

    render() {
        this.markersRef = {};

        const polylines = this.state.showRouting ? this.props.tour.directions.map(direction =>
          <MapView.Polyline
            key={direction.id}
            coordinates={direction.coordinates}
            strokeWidth={2} strokeColor={'#1d8daa'}
          />) : null;
        return (
          <View style={styles.map}>
            <MapView
              ref={(ref) => { this.mapRef = ref; }}
              style={styles.map}
              showsMyLocationButton={false}
              showsUserLocation
              onPanDrag={() => { this.setState({ showLocation: false }); }}
            >
              {this.getMapMarkers()}
              {polylines}
            </MapView>
            <View style={styles.routing}>
              <TouchableHighlight
                style={{ width: 36, height: 36, borderRadius: 50 }}
                onPress={this.updateLocation} underlayColor={styles.touchable}
              >
                <Image source={this.state.showLocation ? locationOn : locationOff} />
              </TouchableHighlight>
              <TouchableHighlight
                style={{ width: 36, height: 36, top: 5, borderRadius: 50 }}
                onPress={this.toggleRouting} underlayColor={styles.touchable}
              >
                <Image source={this.state.showRouting ? routingOn : routingOff} />
              </TouchableHighlight>
            </View>
            <TourRecord
              ref={(c) => { this.modal = c; }}
            />
          </View>
        );
    }
}

TourMap.defaultProps = {
    tour: new Tour(),
};

TourMap.propTypes = {
    tour: PropTypes.instanceOf(Tour),
};
