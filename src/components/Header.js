import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View,
         Text, TouchableHighlight,
         Modal, Button,
         Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        flex: 0.09,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1d8daa',
    },
    button: {
        top: 5,
        padding: 4,
    },
    title: {
        top: 2,
        fontSize: 20,
        color: '#ffffff',
    },
    image: {
        flex: 1,
    },
    logo: {
        paddingRight: 4,
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        color: '#fffaf0',
    },
});

const imageSource = require('assets/logo.jpg');

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { modalVisible: false };
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal() {
        this.setState({ modalVisible: !this.state.modalVisible });
    }
    render() {
        return (
          <View style={styles.container}>
            <TouchableHighlight
              onPress={this.toggleModal}
              style={styles.button}
              underlayColor={styles.touchable}
            >
              <Icon
                name="bars"
                size={30}
                color="white"
              />
            </TouchableHighlight>
            <Text style={styles.title}>
              {this.props.title}
            </Text>
            <View style={styles.logo}>
              <Image
                style={styles.image}
                source={imageSource}
              />
            </View>
            <Modal
              animationType={'slide'}
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => { }}
            >
              <View style={styles.modal}>
                {this.props.children}
                <Button title="OK" onPress={this.toggleModal} />
              </View>
            </Modal>
          </View>
        );
    }
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
};
Header.defaultProps = {
    children: null,
};
