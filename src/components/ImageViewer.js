import React, { Component } from 'react';
import { Modal } from 'react-native';
import PhotoView from 'react-native-photo-view';

export default class ImageViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
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
        return (
          <Modal
            visible={this.state.visible}
            onRequestClose={() => { }}
          >
            <PhotoView
              source={{ uri: this.state.image }}
              minimumZoomScale={0.5}
              maximumZoomScale={3}
              onTap={() => { this.hide(); }}
              style={{ flex: 1, alignSelf: 'stretch' }}
            />
          </Modal>
        );
    }
}
