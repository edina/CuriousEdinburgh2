import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TourMap from './TourMap';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function CuriousEdinburgh() {
  return (
    <View style={styles.container}>
      <Text>Header</Text>
      <ScrollableTabView tabBarPosition="bottom">
        <TourMap tabLabel="Map" />
        <Text tabLabel="List">TODO List</Text>
        <Text tabLabel="About">TODO About</Text>
      </ScrollableTabView>
    </View>
  );
}
