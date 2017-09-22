import React, { Component } from 'react';
import { Modal, Dimensions, ScrollView, Text } from 'react-native';
import PhotoView from 'react-native-photo-view';

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
            image: null,
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
            visible={visible}
            onRequestClose={() => { }}
          >
            <PhotoView
              source={{ uri: image ? image.url : null }}
              minimumZoomScale={0.5}
              maximumZoomScale={3}
              onTap={() => { this.hide(); }}
              resizeMode="contain"
              style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
            />
            <ScrollView
              style={{
                  position: 'absolute',
                  height: 60,
                  left: 0,
                  top: Dimensions.get('window').height - 60,
                  width: Dimensions.get('window').width,
              }}
            >
              <Text
                style={{
                    backgroundColor: '#098caa',
                    color: '#ffffff',
                    minHeight: 60,
                    padding: 5 }}
              >
                {image ? image.text : null}
              </Text>
            </ScrollView>
          </Modal>
        );
    }
}
