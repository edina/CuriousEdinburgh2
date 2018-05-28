import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import styles from '../styles/TourPlaceCallout';

/**
 * Class which determines the shape of the callout that is shown
 * whenever a marker on the map is clicked.
 * @param props The props given to the callout. Consists of a title and a description.
 * @constructor
 */
export default function TourPlaceCallout(props) {
    return (
      <View style={styles.callout}>
        <View style={styles.calloutHeader}>
          <Text style={styles.calloutHeaderTitle}>{props.title}</Text>
        </View>
        <View style={styles.calloutBody}>
          <Text>{props.description}</Text>
        </View>
      </View>
    );
}
TourPlaceCallout.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

