import React, { Component } from 'react';
import { WebView, View, ScrollView, Text } from 'react-native';
import Modal from 'react-native-modal';
import PhotoView from 'react-native-photo-view';
import styles from './styles/MediaViewer';

/**
 * Component which handles showing images or videos when they are clicked on in the TourRecord.
 */
export default class MediaViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            image: null,
            video: null,
        };
    }

    /**
     * When hiding, do not set image or video to null,
     * because that would cancel the exiting animation.
     */
    hide() {
        this.setState({
            visible: false,
        });
    }

    showImage(img) {
        this.setState({
            visible: true,
            image: img,
            video: null,
        });
    }

    showVideo(vid) {
        this.setState({
            visible: true,
            image: null,
            video: vid,
        });
    }

    render() {
        const { visible, image, video } = this.state;
        // Render this if the component is called with an image.
        if (image) {
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
              </Modal>);
        }
        // Render this if the component is called with a video.
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
              <WebView
                source={{ uri: video }}
                style={{ flex: 4, margin: 15 }}
              />
            </View>
          </Modal>);
    }
}
