import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export default function Home() {
    return (
      <MapView
        style={styles.map}
        showUserLocation="true"
      />
    );
}
