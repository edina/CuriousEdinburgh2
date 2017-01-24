import React, { Component } from 'react';
import { Image,
         Linking,
         Modal,
         Text,
         ScrollView,
         TouchableHighlight,
         View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

    render() {
        const images = this.state.record.images.map(image =>
          <View
            key={image}
            style={styles.imageContainer}
          >
            <Image
              style={styles.image}
              source={{ uri: image }}
            />
          </View>,
        );
        const links = this.state.record.additionalLinks.map(link =>
          <TouchableHighlight
            key={link}
            onPress={() => Linking.openURL(link)}
          >
            <Text style={styles.link}>{link}</Text>
          </TouchableHighlight>,
        );

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
                  style={styles.left}
                  onPress={() => {
                      this.close();
                  }}
                >
                  <Icon
                    style={styles.close}
                    name="window-close"
                    size={50}
                    color="white"
                  />
                </TouchableHighlight>
                <Text style={styles.title}>{this.state.record.title}</Text>
                <View style={styles.right} />
              </View>
            </View>
            <View style={styles.body}>
              <ScrollView style={styles.images} horizontal >
                {images}
              </ScrollView>
              <View style={styles.details}>
                <Text style={styles.address}>{this.state.record.streetAddress}</Text>
                <Text style={styles.description}>{this.state.record.description}</Text>
                <Text style={styles.linksTitle}>Associated Links</Text>
                <View>{links}</View>
              </View>
            </View>
          </Modal>
        );
    }
}
