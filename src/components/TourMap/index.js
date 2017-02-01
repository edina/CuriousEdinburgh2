import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';
import TourPlaceCalloutView from './TourPlaceCalloutView';

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    marker: {
        backgroundColor: '#2c9eb7',
        padding: 5,
        borderRadius: 5,
        width: 30,
        height: 30,
        textAlign: 'center',
        color: '#ffffff',
    },
});

export default class TourMap extends Component {
    constructor(props) {
        super(props);
        this.mapRef = null;
        this.mapMarkerRef = [];
        this.calloutOpened = null;
    }
    componentDidMount() {
        this.centerMap();
    }
    componentDidUpdate() {
        this.centerMap();
    }
    /*
        This method is fired if we want to bind onPress from MapView.Marker
        to show/hide a Mapview.Callout associated to a MapView.Marker
    */
    onMarkerPress(id) {
        if (this.mapMarkerRef[id]) {
            if (this.calloutOpened === id) {
                this.calloutOpened = null;
                this.mapMarkerRef[id].hideCallout();
            } else {
                if (this.calloutOpened !== null) {
                    this.mapMarkerRef[this.calloutOpened].hideCallout();
                }
                this.calloutOpened = id;
                this.mapMarkerRef[id].showCallout();
            }
        }
    }
    centerMap() {
        const markerIDs = this.props.tourPlaces.map(tourPlace =>
            tourPlace.id);
        if (this.mapRef !== null) {
            this.mapRef.fitToSuppliedMarkers(markerIDs, false);
        }
    }
    render() {
        // Add the following attrs to MapView.Marker, if you want to bind onMarkerPress event
        // ref={(ref) => { this.mapMarkerRef[tourPlace.id] = ref; }}
        // onPress={() => this.onMarkerPress(tourPlace.id)}
        const listMarkers = this.props.tourPlaces.map(tourPlace =>
          <MapView.Marker
            key={tourPlace.id}
            identifier={tourPlace.id}
            coordinate={{ latitude: tourPlace.location.latitude,
                longitude: tourPlace.location.longitude }}
            onPress={() => { console.log('marker %o pressed', tourPlace.id); }}
            onCalloutPress={() => { console.log('callout %o pressed', tourPlace.id); }}
          >
            <Text style={styles.marker}>{tourPlace.stop}</Text>
            <MapView.Callout tooltip>
              <TourPlaceCalloutView
                title={tourPlace.title}
                description={tourPlace.getShortDescription(100)}
              />
            </MapView.Callout>
          </MapView.Marker>);
        return (
          <MapView
            ref={(ref) => { this.mapRef = ref; }}
            style={styles.map}
          >
            {listMarkers}
          </MapView>
        );
    }
}
TourMap.propTypes = {
    tourPlaces: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};
