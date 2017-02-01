import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    callout: {
        width: 200,
        height: 100,
    },
    calloutHeader: {
        width: 200,
        backgroundColor: '#2c9eb7',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        padding: 5,
    },
    calloutHeaderTitle: {
        color: '#ffffff',
        textAlign: 'center',
    },
    calloutBody: {
        width: 200,
        backgroundColor: '#ffffff',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 5,
    },
});
export default function TourPlaceCallout(props) {
    return (
      <MapView.Callout tooltip style={styles.callout}>
        <View>
          <View style={styles.calloutHeader}>
            <Text style={styles.calloutHeaderTitle}>{props.title}</Text>
          </View>
          <View style={styles.calloutBody}>
            <Text>{props.description}</Text>
          </View>
        </View>
      </MapView.Callout>
    );
}
TourPlaceCallout.propTypes = {
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
};

