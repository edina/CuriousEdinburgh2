import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet, View,
    Text, TouchableHighlight,
    Modal, Button,
    Image, TouchableWithoutFeedback, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TourList from './TourList';

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
    modalOuterView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080',
    },
    modalInnerView: {
        flex: 0,
        flexDirection: 'column',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
    touchable: {
        color: '#fffaf0',
    },
});

const imageSource = require('assets/logo.jpg');

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { modalVisible: false, selectedValue: this.props.tourListSelectedValue };
        this.toggleModal = this.toggleModal.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    onValueChange(itemValue) {
        this.setState({ selectedValue: itemValue });
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
              animationType={'fade'}
              transparent
              visible={this.state.modalVisible}
              onRequestClose={() => {
                  this.toggleModal();
              }}
            >
              <TouchableOpacity style={styles.modalOuterView} onPress={() => { this.toggleModal(); }} activeOpacity={1} >
                <TouchableWithoutFeedback>
                  <View
                    style={styles.modalInnerView}
                  >
                    {this.props.children}
                    <TourList
                      tours={this.props.tourListTours}
                      selectedValue={this.props.tourListSelectedValue}
                      onValueChange={this.onValueChange}
                    />
                    <Button
                      title="OK" onPress={() => {
                          this.props.okButtonFunction(this.state.selectedValue);
                          this.toggleModal();
                      }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </Modal>
          </View>
        );
    }
    }
Header.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
    tourListTours: PropTypes.arrayOf(PropTypes.object).isRequired,
    tourListSelectedValue: PropTypes.string.isRequired,
    okButtonFunction: PropTypes.func.isRequired,
};
Header.defaultProps = {
    children: null,
};
