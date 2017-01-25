import React, { Component } from 'react';
import { Picker } from 'react-native';

export default class TourList extends Component {
    constructor(props) {
        super(props);
        this.state = { tourId: this.props.selectedValue };
        this.onValueChange = this.onValueChange.bind(this);
    }
    onValueChange(itemValue) {
        this.setState({ tourId: itemValue });
        this.props.onValueChange(itemValue);
    }
    render() {
        const pickerList = this.props.tours.map(tour => (
          <Picker.Item key={tour.id} label={tour.name} value={tour.id} />
        ));
        return (
          <Picker
            selectedValue={this.state.tourId}
            onValueChange={this.onValueChange}
          >
            {pickerList}
          </Picker>
        );
    }
}
TourList.propTypes = {
    tours: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    selectedValue: React.PropTypes.string.isRequired,
    onValueChange: React.PropTypes.func.isRequired,
};
