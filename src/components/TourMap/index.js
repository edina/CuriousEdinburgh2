import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import TourPlaceCallout from './TourPlaceCallout';
import TourRecord from '../TourRecord';

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
        this.modal = null;
        this.onMarkerPress = this.onMarkerPress.bind(this);
    }
    componentDidMount() {
        this.centerMap();
    }
    componentDidUpdate() {
        this.centerMap();
    }
    onMarkerPress(tourPlace) {
        this.modal.show(tourPlace);
    }
    centerMap() {
        const markerIDs = this.props.tourPlaces.map(tourPlace =>
            tourPlace.id);
        if (this.mapRef !== null) {
            this.mapRef.fitToSuppliedMarkers(markerIDs, false);
        }
    }
    render() {
        const listMarkers = this.props.tourPlaces.map(tourPlace =>
          <MapView.Marker
            key={tourPlace.id}
            identifier={tourPlace.id}
            coordinate={{ latitude: tourPlace.location.latitude,
                longitude: tourPlace.location.longitude }}
            onCalloutPress={() => { this.onMarkerPress(tourPlace); }}
          >
            <Text style={styles.marker}>{tourPlace.stop}</Text>
            <MapView.Callout tooltip style={{ width: 200 }}>
              <TourPlaceCallout
                title={tourPlace.title}
                description={tourPlace.getShortDescription(100)}
              />
            </MapView.Callout>
          </MapView.Marker>);
        return (
          <View style={styles.map}>
            <MapView
              ref={(ref) => { this.mapRef = ref; }}
              style={styles.map}
            >
              {listMarkers}
            </MapView>
            <TourRecord
              ref={(c) => { this.modal = c; }}
            />
          </View>
        );
    }
}
TourMap.propTypes = {
    tourPlaces: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};
