import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View,
         Text, TouchableHighlight,
         Modal, Button,
         Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/Header';
import TourList from './TourList';

const imageSource = require('assets/logo.jpg');

/**
 * The component which keeps the Header section located at the top of the screen.
 * Includes the title of the current tour, as well as an interface for changing tours.
 */
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { modalVisible: false, selectedValue: this.props.tourListSelectedValue };
        this.toggleModal = this.toggleModal.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    /**
     * Set the state to have the correct selectedValue.
     * Called whenever a user chooses a tour in the Picker.
     * OK button does not have to be clicked for this to be called.
     *
     * Necessary for the OK button to see which tour is currently selected.
     *
     * @param itemValue The newly selected tour.
     */
    onValueChange(itemValue) {
        this.setState({ selectedValue: itemValue });
    }

    /**
     * Opens and closes the interface for picking a new tour.
     */
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
                  this.setState({ selectedValue: this.props.tourListSelectedValue });
              }}
            >
              <TouchableOpacity
                style={styles.modalOuterView}
                onPress={() => {
                    this.toggleModal();
                    this.setState({ selectedValue: this.props.tourListSelectedValue });
                }}
                activeOpacity={1}
              >
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

/**
 * For OK button to work as intended (e.g. to actually change the tour if needed),
 * it must be able to communicate with the TourList, to find the selected Tour to open.
 * So they must both be in the same location in the app, but the function for changing
 * the Tour (okButtonFunction), as well as the list of tours to choose from (tourListTours)
 * and the initially selected value (tourListSelectedValue) are located in CuriousEdinburgh.
 * Therefore, these props must be passed down from the CuriousEdinburgh component.
 *
 * @type {{title: String, children: Element, tourListTours: Array(Tour),
  * tourListSelectedValue: String, okButtonFunction: Function}}
 */
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
