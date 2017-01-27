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
        color: '#ffffff',
    },
    callout: {
        width: 300,
        height: 300,
        backgroundColor: '#ffffff',
    },
});

export default class TourMap extends Component {
    constructor(props) {
        super(props);
        this.mapRef = null;
    }
    componentDidMount() {
        this.centerMap();
    }
    componentDidUpdate() {
        this.centerMap();
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
          <MapView.Marker
            key={tourPlace.id}
            identifier={tourPlace.id}
            coordinate={{ latitude: tourPlace.location.latitude,
                longitude: tourPlace.location.longitude }}
            onPress={() => console.log('marker %o onPress', tourPlace.id)}
          >
            <Text style={styles.marker}>{tourPlace.stop}</Text>
            <MapView.Callout tooltip onPress={() => console.log('callout %o onPress', tourPlace.id)}>
              <View style={styles.callout}>
                <Text>{tourPlace.title}</Text>
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
