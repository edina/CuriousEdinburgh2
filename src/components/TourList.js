import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'react-native';

/**
 * Component which shows a list of tours to choose from.
 * Used in the Header, where the user can choose which tour is shown on the map.
 */
export default class TourList extends Component {
    constructor(props) {
        super(props);
        this.state = { tourId: this.props.selectedValue };
        this.onValueChange = this.onValueChange.bind(this);
    }

    /**
     * Set the state to have the correct selectedValue.
     * Called whenever a user chooses a tour in the Picker.
     *
     * Necessary so that after a user chooses a tour in the Picker,
     * the Picker actually shows the tour as selected and not just the default one.
     *
     * @param itemValue The newly selected tour.
     */
    onValueChange(itemValue) {
        this.setState({ tourId: itemValue });
    }

    render() {
        const pickerList = this.props.tours.map(tour => (
          <Picker.Item key={tour.id} label={tour.name} value={tour.id} />
        ));
        return (
          <Picker
            selectedValue={this.state.tourId}
            onValueChange={(value) => {
                this.onValueChange(value);
                this.props.onValueChange(value);
            }}
            style={{ width: 320 }}
          >
            {pickerList}
          </Picker>
        );
    }
}

TourList.propTypes = {
    tours: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedValue: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
};
