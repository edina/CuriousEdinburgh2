import React, { Component } from 'react';
import { Image,
         Linking,
         Modal,
         ScrollView,
         Text,
         TouchableHighlight,
         View,
         WebView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageViewer from './ImageViewer';

const styles = require('./styles/TourRecord');

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
        this.modal.show(image);
    }

    render() {
        const images = this.state.record.images.map(image =>
          <TouchableHighlight
            key={image}
            style={styles.mediaContainer}
            onPress={
              () => this._onImageClick(image)
            }
          >
            <Image
              style={styles.media}
              source={{ uri: image }}
            />
          </TouchableHighlight>,
        );
        const links = this.state.record.additionalLinks.map(link =>
          <TouchableHighlight
            key={link}
            onPress={() => Linking.openURL(link)}
          >
            <Text style={styles.link}>{link}</Text>
          </TouchableHighlight>,
        );
        const video = this.state.record.video ?
            (<View style={styles.mediaContainer}>
              <WebView
                source={{ uri: this.state.record.video }}
                style={styles.media}
              />
            </View>)
        : undefined;

        return (
          <Modal
            style={styles.page}
            transparent={false}
            visible={this.state.visible}
            onRequestClose={() => { }}
          >
            <ImageViewer
              ref={(c) => { this.modal = c; }}
            />
            <View>
              <View
                style={
                    styles.header
                }
              >
                <View style={styles.left}>
                  <TouchableHighlight
                    onPress={() => {
                        this.close();
                    }}
                  >
                    <Icon
                      style={styles.close}
                      name="window-close"
                      size={40}
                      color="white"
                    />
                  </TouchableHighlight>
                </View>
                <Text style={styles.title}>{this.state.record.title}</Text>
                <View style={styles.right} />
              </View>
            </View>
            <ScrollView style={styles.body}>
              <ScrollView style={styles.images} horizontal >
                {video}
                {images}
              </ScrollView>
              <View style={styles.details}>
                <Text style={styles.address}>{this.state.record.streetAddress}</Text>
                <Text style={styles.description}>{this.state.record.description}</Text>
                <Text style={styles.linksTitle}>Associated Links</Text>
                <View>{links}</View>
              </View>
            </ScrollView>
          </Modal>
        );
    }
}
