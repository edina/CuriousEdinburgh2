import React, { Component } from 'react';
import { Modal,
         Text,
         ScrollView,
         StyleSheet,
         TouchableHighlight,
         View } from 'react-native';

const styles = StyleSheet.create({
    page: {
        flex: 1, justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
    },
    body: {

    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
});

export default class TourRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            record: {
                images: [],
            },
        };
    }

    show(rec) {
        // console.log(record);
        this.setState({
            visible: true,
            record: rec,
        });
    }

    close() {
        this.setState({ visible: false });
    }

    render() {
        return (
          <Modal
            style={styles.page}
            transparent={false}
            visible={this.state.visible}
            onRequestClose={() => { }}
          >
            <View>
              <View
                style={
                    styles.header
                }
              >
                <TouchableHighlight
                  onPress={() => { this.close(); }}
                >
                  <Text>Close</Text>
                </TouchableHighlight>
                <Text>{this.state.record.title}</Text>
              </View>
            </View>
            <View>
              <Text>Hello</Text>
              <ScrollView />
              <Text>{this.state.record.description}</Text>
            </View>
          </Modal>
        );
    }
}
