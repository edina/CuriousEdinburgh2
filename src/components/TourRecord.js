import React, { Component } from 'react';
import {
    Image,
    Linking,
    Modal,
    ScrollView,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    WebView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'react-native-fetch-blob';
import Share from 'react-native-share';
import ImageViewer from './ImageViewer';
import styles from './styles/TourRecord';
import Utils from '../utils';

const playButton = require('assets/youtube_play_button.png');

export default class TourRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            record: {
                images: [],
                additionalLinks: [],
            },
        };
    }

    show(rec) {
        this.setState({
            visible: true,
            record: rec,
        });
    }

    close() {
        this.setState({ visible: false });
    }


    _onImageClick(image) {
        this.modal.showImage(image);
    }

    _onVideoClick(video) {
        this.modal.showVideo(video);
    }
    render() {
        const { record, visible } = this.state;
        const images = record.images.map(image =>
          <TouchableHighlight
            key={image.url}
            style={styles.mediaContainer}
            onPress={
              () => this._onImageClick(image)
            }
          >
            <Image
              style={styles.media}
              source={{ uri: image.url }}
            />
          </TouchableHighlight>,
        );

        const links = record.additionalLinks.map(link =>
          <TouchableHighlight
            key={link.url}
            onPress={() => Linking.openURL(link.url)}
            underlayColor="transparent"
          >
            <Text style={styles.link}>{link.text}</Text>
          </TouchableHighlight>,
        );
        let video;
        if (record.video) {
            if (Utils.isIos()) {
                video = (<View style={styles.mediaContainer}>
                  <WebView
                    source={{ uri: record.video }}
                    style={styles.media}
                  />
                </View>);
            } else if (Utils.isAndroid()) {
                video = (<TouchableHighlight
                  key={record.video}
                  style={styles.mediaContainer}
                  onPress={
                        () => this._onVideoClick(record.video)
                    }
                ><View>
                  <Image
                    style={styles.media}
                    source={{ uri: `https://img.youtube.com/vi/${record.video.slice(-11)}/0.jpg` }}
                  >
                    <View>
                      <Image
                        style={styles.youtubeButton}
                        source={playButton}
                      />
                    </View>
                  </Image>
                </View>
                </TouchableHighlight>);
            }
        }

        const shareOptions = {
            title: record.title,
            message: `Exploring ${record.title} with @curiousedi. ${record.url}`,
            subject: record.title, //  for email
        };
        if (record.images.length > 0) {
            const fs = RNFetchBlob.fs;
            let imagePath = null;

            RNFetchBlob
                .config({
                    fileCache: true,
                })
                .fetch('GET', record.images[0].url)
                // the image is downloaded to device's storage
                .then((resp) => {
                    // the image path can be used directly with Image component
                    imagePath = resp.path();
                    return resp.readFile('base64');
                })
                .then((base64Data) => {
                    // here's base64 encoded image
                    shareOptions.url = `data:image/jpeg;base64,${base64Data}`;

                    // remove the file from storage
                    return fs.unlink(imagePath);
                });
        } else {
            // default is tour stop url
            shareOptions.url = record.url;
        }

        return (
          <Modal
            style={styles.page}
            transparent={false}
            visible={visible}
            onRequestClose={() => this.close()}
            animationType={'slide'}
          >
            <ImageViewer
              ref={(c) => { this.modal = c; }}
            />
            <View>
              <TouchableOpacity
                onPress={() => {
                    this.close();
                }}
                style={
                            styles.header
                        }
                activeOpacity={0.7}
              >
                <View style={styles.left}>
                  <Icon
                    style={styles.close}
                    name="ios-arrow-down"
                    size={40}
                    color="white"
                  />
                </View>
                <Text style={styles.title}>{record.title}</Text>
                <View style={styles.right} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.body}>
              <ScrollView style={styles.images} horizontal>
                {video}
                {images}
              </ScrollView>
              <View style={styles.details}>
                <Text style={styles.address}>{record.streetAddress}</Text>
                <Text style={styles.description}>{record.description}</Text>

                {record.additionalLinks.length > 0 &&
                <Text style={styles.linksTitle}>Associated Links</Text>
                        }
                <View>{links}</View>

                <TouchableOpacity
                  onPress={() => {
                      Share.open(shareOptions).catch(() => {
                      });
                  }}
                >
                  <View style={styles.share}>
                    <Text style={styles.shareLink}>Share this Tour Stop</Text>
                  </View>
                </TouchableOpacity>

              </View>
            </ScrollView>
          </Modal>
        );
    }
}
