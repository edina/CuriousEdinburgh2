import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    map: {
        flex: 1,
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
            title={tourPlace.title}
            description={tourPlace.description}
          />));
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
TourMap.propTypes = {   // forbid-prop-types requires further investigation
    tourPlaces: React.PropTypes.array.isRequired,   // eslint-disable-line react/forbid-prop-types
};
