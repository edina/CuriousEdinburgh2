import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TourMap from './TourMap';
import TourList from './TourList';

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
                <TourList tabLabel="List" />
                <Text tabLabel="About">TODO About</Text>
            </ScrollableTabView>
        </View>
    );
}
