import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image, Modal } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 0.08,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        top: 2,
        padding: 4,
    },
    title: {
        fontSize: 20,
    },
});
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
        console.log(this.state);
        return (
          <View style={styles.container}>
            <TouchableHighlight onPress={this.toggleModal} style={styles.button}>
              <Image
                source={require('../assets/menu.png')} style={{ width: 32, height: 32 }}
              />
            </TouchableHighlight>
            <Text style={styles.title}>
              {this.props.title}
            </Text>
            <Text>Logo</Text>
            <Modal
              animationType={'slide'}
              transparent={false}
              visible={this.state.modalVisible}
            >
              <TouchableHighlight onPress={() => { this.toggleModal(); }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </Modal>
          </View>
        );
    }
}
Header.propTypes = {
    title: React.PropTypes.string.isRequired,
};
