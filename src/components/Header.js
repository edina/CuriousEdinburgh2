import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';

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
export default function Header(props) {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={props.toggleMenu} style={styles.button}>
          <Image
            source={require('../assets/menu.png')} style={{ width: 32, height: 32 }}
          />
        </TouchableHighlight>
        <Text style={styles.title}>{props.title}</Text>
        <Text>Logo</Text>
      </View>
    );
}
Header.propTypes = {
    title: React.PropTypes.string.isRequired,
    toggleMenu: React.PropTypes.func.isRequired,
};
