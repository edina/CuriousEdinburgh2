import React, { Component } from 'react';
import { StyleSheet,
    ScrollView,
    Text } from 'react-native';

const styles = StyleSheet.create({
    menu: {
        backgroundColor: 'grey',
    },
});
export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
          <ScrollView scrollsToTop={false} style={styles.menu}>
            <Text>Item1</Text>
            <Text>Item2</Text>
            <Text>Item3</Text>
            <Text>Item4</Text>
          </ScrollView>
        );
    }
}

