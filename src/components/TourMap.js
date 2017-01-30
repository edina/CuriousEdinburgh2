import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    marker: {
        backgroundColor: '#2c9eb7',
        padding: 5,
        borderRadius: 5,
        width: 25,
        height: 25,
        textAlign: 'center',
        color: '#ffffff',
    },
    callout: {
        width: 200,
        height: 100,
    },
    calloutHeader: {
        width: 200,
        backgroundColor: '#2c9eb7',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        padding: 5,
    },
    calloutBody: {
        width: 200,
        backgroundColor: '#ffffff',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 5,
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
        const listMarkers = this.props.tourPlaces.map(tourPlace => (
            // Remove attribute comments to bind onPress to onMarkerPress method
          <MapView.Marker
            // ref={(ref) => { this.mapMarkerRef[tourPlace.id] = ref; }}
            key={tourPlace.id}
            identifier={tourPlace.id}
            coordinate={{ latitude: tourPlace.location.latitude,
                longitude: tourPlace.location.longitude }}
            // onPress={() => this.onMarkerPress(tourPlace.id)}
          >
            <Text style={styles.marker}>{tourPlace.stop}</Text>
            {console.log(tourPlace.stop)}
            <MapView.Callout tooltip>
              <View style={styles.callout}>
                <View style={styles.calloutHeader}>
                  <Text style={{ color: '#ffffff', textAlign: 'center' }}>{tourPlace.title}</Text>
                </View>
                <View style={styles.calloutBody}>
                  <Text>{tourPlace.getShortDescription(100)}</Text>
                </View>
              </View>
            </MapView.Callout>
          </MapView.Marker>));
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

// https://github.com/airbnb/react-native-maps/issues/553
