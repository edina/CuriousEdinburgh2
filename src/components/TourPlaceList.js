import React, { Component } from 'react';
import { Image, ListView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import TourRecord from '../components/TourRecord';

const styles = StyleSheet.create({
    place: {
        padding: 10,
    },
    title: {
        padding: 4,
        fontWeight: 'bold',
        color: '#408ba4',
        backgroundColor: '#e6e6e6',
    },
    detail: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 5,
    },
    numberContainer: {
        paddingRight: 5,
    },
    number: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#71b3c1',
        borderRadius: 50,
        width: 30,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderWidth: 2,
        borderColor: '#459db4',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    text: {
        flex: 1,
        padding: 10,
    },
});

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

    _onPressRecord(row) {
        this.refs.modal.show(row); // eslint-disable-line react/no-string-refs
    }

    render() {
        /*eslint-disable */
        return (
          <View style={{ flex: 1, paddingTop: 22 }}>
            <TourRecord
              ref="modal" />
            <ListView
              dataSource={this.state.dataSource}
              renderRow={
                rowData =>
                  <TouchableHighlight
                    onPress={
                      this._onPressRecord.bind(this, rowData)}>
                    <View style={styles.place}>
                      <Text style={styles.title}>{rowData.title}</Text>
                      <View style={styles.detail}>
                        <View style={styles.numberContainer}>
                          <Text style={styles.number}>{rowData.tourStop}</Text>
                        </View>
                        <Image
                          style={styles.image}
                          source={{ uri: rowData.images[0] }}
                        />
                        <Text style={styles.text}>{rowData.description}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
              }
            />
          </View>
        );
        /*eslint-enable */
    }
}

TourPlaceList.propTypes = {
    tourPlaces: React.PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
