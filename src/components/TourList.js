import React, { Component } from 'react';
import { Picker } from 'react-native';

export default class TourList extends Component {
    render() {
        const pickerList = this.props.tours.map(tour => (
          <Picker.Item key={tour.id} label={tour.name} value={tour.id} />
        ));
        return (
          <Picker
            selectedValue={this.props.selectedTourId}
            onValueChange={this.props.changeSelectedTour}
          >
            {pickerList}
          </Picker>
        );
    }
}
