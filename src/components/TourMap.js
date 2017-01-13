import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import WordPress from '../services/WordPress';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default class TourMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = { postMarkers: [] };
  }
  componentDidMount() {
    WordPress.getPostsFromCategory(this.props.id).then((posts) => {
      this.setState({ postMarkers: posts });
    });
  }
  componentDidUpdate() {
    const markerIDs = this.state.postMarkers.map(postMarker =>
      postMarker.id.toString());
    this.mapRef.fitToSuppliedMarkers(markerIDs, false);
  }
  render() {
    const listMarkers = this.state.postMarkers.map(postMarker => (
      <MapView.Marker
        key={postMarker.id.toString()}
        identifier={postMarker.id.toString()}
        coordinate={{ latitude: parseFloat(postMarker.custom_fields.latitude),
          longitude: parseFloat(postMarker.custom_fields.longitude) }}
        title={postMarker.custom_fields.OSM_Marker_01_Name}
        description={postMarker.custom_fields.OSM_Marker_01_Text}
      />
    ));
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
  id: React.PropTypes.string,
};

TourMap.defaultProps = {
  id: '25',
};
