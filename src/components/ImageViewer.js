import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { View, ScrollView, Text } from 'react-native';
import PhotoView from 'react-native-photo-view';
import styles from './styles/ImageViewer';

export default class ImageViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            image: null,
        };
    }

    hide() {
        this.setState({
            visible: false,
        });
    }

    show(img) {
        this.setState({
            visible: true,
            image: img,
        });
    }

    render() {
        const { visible, image } = this.state;
        return (
          <Modal
            isVisible={visible}
            animationIn={'bounceIn'}
            animationInTiming={1000}
            animationOut={'bounceOut'}
            animationOutTiming={500}
            onBackButtonPress={() => {
                this.hide();
            }}
            onBackdropPress={() => {
                this.hide();
            }}
          >
            <View
              style={{ borderRadius: 10, backgroundColor: '#098caa', flex: 0.7 }}
            >
              <PhotoView
                source={{ uri: image ? image.url : null }}
                minimumZoomScale={1}
                maximumZoomScale={3}
                resizeMode="contain"
                style={{ flex: 6, marginTop: 20 }}
              />
              <View
                style={{
                    flex: 1,
                    minWidth: 100,
                    marginTop: 5,
                    marginBottom: 15,
                }}
              >
                <ScrollView
                  style={{
                      flex: 1,
                  }}
                >
                  <Text
                    style={styles.image}
                  >
                    {image ? image.text : null}
                  </Text>
                </ScrollView>
              </View>
            </View>
          </Modal>
        );
    }
}
