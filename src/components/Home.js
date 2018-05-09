import React from 'react';
import MapView from 'react-native-maps';
import styles from './styles/Home';


export default function Home() {
    return (
      <MapView
        style={styles.map}
        showUserLocation="true"
      />
    );
}
