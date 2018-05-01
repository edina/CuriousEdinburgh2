import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'react-native';

export default class TourList extends Component {
    constructor(props) {
        super(props);
        this.state = { tourId: this.props.selectedValue };
        this.onValueChange = this.onValueChange.bind(this);
    }

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
            style={{ width: 320}}
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
