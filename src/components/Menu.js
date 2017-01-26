import React, { Component } from 'react';
import { StyleSheet,
    ScrollView,
    Text,
    Dimensions } from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    menu: {
        flex:1,
        width: window.width,
        height: window.height,
        backgroundColor: 'grey',
        padding: 20,
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
            <Text>Menu</Text>
          </ScrollView>
        );
    }
}

