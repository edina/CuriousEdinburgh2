import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    ListView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import TourRecord from '../components/TourRecord';
import styles from '../components/styles/TourPlaceList';

export default class TourPlaceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
        };
    }

    componentWillMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.props.tourPlaces),
        });
    }

    componentWillReceiveProps(nextProps) {
        // if current tourPlaces object is different from next tourPlaces
        if (this.props.tourPlaces !== nextProps.tourPlaces) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.tourPlaces),
            });
        }
    }

    _onPressRecord(row) {
        this.modal.show(row);
    }

    render() {
        return (
          <View style={styles.page}>
            <TourRecord
              ref={(c) => {
                  this.modal = c;
              }}
            />
            <ListView
              dataSource={this.state.dataSource}
              renderRow={
                        rowData =>
                          <View style={styles.place}>
                            <TouchableOpacity
                              onPress={
                                        () => this._onPressRecord(rowData)
                                    }
                              activeOpacity={0.7}
                            >
                              <View style={styles.container}>
                                <View style={styles.numberContainer}>
                                  <Text style={styles.number}>{rowData.stop}</Text>
                                </View>
                                <Text style={styles.title}>{rowData.title}</Text>
                              </View>
                              <View style={styles.detail}>
                                <Image
                                  style={styles.image}
                                  source={{ uri: rowData.images[0].url }}
                                />
                                <Text
                                  style={styles.text}
                                >
                                  {rowData.getShortDescription()}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                    }
            />
          </View>
        );
    }
}

TourPlaceList.propTypes = {
    tourPlaces: PropTypes.arrayOf(PropTypes.object).isRequired,
};
