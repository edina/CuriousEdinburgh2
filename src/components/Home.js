import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

// TODO problem on android filling height (see https://github.com/facebook/react-native/issues/400), but maybe not s problem with recommended mapview
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
