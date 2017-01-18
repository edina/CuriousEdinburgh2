import React, { Component } from 'react';
import { Image, ListView, StyleSheet, Text, View } from 'react-native';
import WordPress from '../services/WordPress';

const Entities = require('html-entities').XmlEntities;
const DomParser = require('react-native-html-parser').DOMParser;

const styles = StyleSheet.create({
    place: {
        padding: 10,
    },
    title: {
        padding: 4,
        fontWeight: 'bold',
        color: '#408ba4',
        backgroundColor: '#e6e6e6',
    },
    detail: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 5,
    },
    numberContainer: {
        paddingRight: 5,
    },
    number: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#71b3c1',
        borderRadius: 50,
        width: 30,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderWidth: 2,
        borderColor: '#459db4',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    text: {
        flex: 1,
        padding: 10,
    },
});

export default class TourList extends Component {
    constructor(props) {
        super(props);
        this.entities = new Entities();
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
        };
    }

    componentDidMount() {
        WordPress.getPostsFromCategory(25).then((posts) => {
            const summary = [];
            posts.forEach((post) => {
                // get image from post.content.rendered
                // this is a hack due to HTML parsing failing on post.content.rendered
                // TODO: this will need to change when https://github.com/edina/CuriousEdinburgh2/issues/24 is done
                const html = post.content.rendered;
                const p = html.substring(html.indexOf('<p>'), html.indexOf('</p>') + 4);
                const doc = new DomParser().parseFromString(p, 'text/html');
                const img = doc.querySelect('img')[0].getAttribute('src');

                summary.push({
                    title: this.entities.decode(post.title.rendered).toUpperCase(),
                    image: img,
                    description: this.entities.decode(post.custom_fields.main_text),
                    tourStop: 1,
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(summary),
            });
        });
    }

    render() {
        return (
          <View style={{ flex: 1, paddingTop: 22 }}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={
                rowData =>
                  <View style={styles.place}>
                    <Text style={styles.title}>{rowData.title}</Text>
                    <View style={styles.detail}>
                      <View style={styles.numberContainer}>
                        <Text style={styles.number}>{rowData.tourStop}</Text>
                      </View>
                      <Image
                        style={styles.image}
                        source={{ uri: rowData.image }}
                      />
                      <Text style={styles.text}>{rowData.description}</Text>
                    </View>
                  </View>
              }
            />
          </View>
        );
    }
}
