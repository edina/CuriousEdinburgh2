import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default class Home extends Component{
  render() {
    return (
      <MapView
        style={styles.map}
        showUserLocation="true"
      />
    );
  }
}
