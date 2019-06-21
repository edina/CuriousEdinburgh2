import React, { Component } from 'react';
import {
    Image,
    ImageBackground,
    Linking,
    Modal,
    ScrollView,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    WebView,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import MediaViewer from './MediaViewer';
import styles from './styles/TourRecord';
import Utils from '../utils';

const playButton = require('assets/youtube_play_button.png');

/**
 * Component which shows information for a tour place whenever it
 * is clicked on in the TourPlaceList.
 * Includes images and videos about the place, a description, and further links.
 */
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
                <WebView source={{ uri: record.video }} style={styles.media} />
            </View>);
          } else if (Utils.isAndroid()) {
            video = (
              <TouchableHighlight key={record.video} style={styles.mediaContainer}
                onPress={
                  () => this._onVideoClick(record.video)
                }>
                <View>
                  <ImageBackground style={styles.media} source={{ uri: `https://img.youtube.com/vi/${record.video.slice(-11)}/0.jpg` }}>
                    <View>
                      <Image style={styles.youtubeButton} source={playButton} />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableHighlight>
            );
          }
        }

        const shareOptions = {
            title: record.title,
            message: `Exploring ${record.title} with @curiousedi.`,
            subject: record.title, //  for email
            url: record.url
        };

        return (
          <Modal
            style={styles.page}
            transparent={false}
            visible={visible}
            onRequestClose={() => this.close()}
            animationType={'slide'}
          >
            <MediaViewer
              ref={(c) => { this.modal = c; }}
            />
            <SafeAreaView  style={styles.safeArea}>
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
          </SafeAreaView>
          </Modal>
        );
    }
}
