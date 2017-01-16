"use strict";

import React, { Component } from 'react';
import { Image, ListView, Text, View } from 'react-native';
import WordPress from '../services/WordPress';
import * as constants from '../constants';

var Entities = require('html-entities').XmlEntities;
var DomParser = require('react-native-html-parser').DOMParser

export default class TourList extends Component{
    constructor(props) {
        super(props);
        this.entities = new Entities();
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            })
        };
    }

    componentDidMount() {
        WordPress.getPostsFromCategory(25).then((posts) => {
            let summary = [];
            for(post of posts){
                // get image from post.content.rendered
                // this is a hack due to HTML parsing failing on post.content.rendered
                // TODO: this will need to change when https://github.com/edina/CuriousEdinburgh2/issues/24 is done
                let html = post.content.rendered;
                let p = html.substring(html.indexOf('<p>'), html.indexOf('</p>') + 4);
                var doc = new DomParser().parseFromString(p, 'text/html')
                let image = doc.querySelect('img')[0].getAttribute('src');

                summary.push({
                    'title': this.entities.decode(post.title.rendered),
                    'image': image,
                    'description': this.entities.decode(post.custom_fields.main_text),
                });
            }

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(summary)
            });
        });
    }

    render() {
        return (
            <View style={{flex: 1, paddingTop: 22}}>
                 <ListView
                     dataSource={this.state.dataSource}
                     renderRow={
                         (rowData) =>
                             <View>
                                 <Text>{rowData.title}</Text>
                                 <Image
                                     style={{width: 50, height: 50}}
                                     source={{uri:rowData.image}}/>
                                 <Text>{rowData.description}</Text>
                             </View>

                     }
                 />
            </View>
        );
    }
}
