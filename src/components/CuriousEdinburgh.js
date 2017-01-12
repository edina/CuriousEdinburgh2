import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Home from './Home';

var ScrollableTabView = require('react-native-scrollable-tab-view');

export default class CuriousEdinburgh extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Header</Text>
        <ScrollableTabView tabBarPosition='bottom'>
          <Home tabLabel="Map"/>
          <Text tabLabel="List" />
          <Text tabLabel="About" />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
