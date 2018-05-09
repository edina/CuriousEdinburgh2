import React, { Component } from 'react';
import { Modal, Dimensions, ScrollView, Text } from 'react-native';
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
            onRequestClose={() => {}}
          >
            <PhotoView
              source={{ uri: image ? image.url : null }}
              minimumZoomScale={1}
              maximumZoomScale={3}
              onTap={() => {
                  this.hide();
              }}
              resizeMode="contain"
              style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
            />
            <ScrollView
              style={
              [styles.scrollView,
                  { top: Dimensions.get('window').height - 60,
                      width: Dimensions.get('window').width },
              ]}
            >
              <Text
                style={styles.image}
              >
                {image ? image.text : null}
              </Text>
            </ScrollView>
          </Modal>
        );
    }
}
