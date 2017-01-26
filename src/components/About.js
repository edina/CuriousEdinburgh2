import React from 'react';
import { Image,
         Text,
         ScrollView,
         View } from 'react-native';

const styles = require('./styles/About');
const banner = require('./images/curious-edinburgh-banner.png');

export default function About() {
    /* eslint-disable max-len */
    return (
      <ScrollView style={styles.page}>
        <View style={styles.header}>
          <Image
            source={banner}
            style={styles.banner}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>What is Curious Edinburgh?</Text>
          <Text style={styles.text}>Are you interested in the fascinating and important scientific, medical and technological heritage of the city of Edinburgh? The tours on our new website and its accompanying app will be your guide to the history of ideas in the Athens of the North. We have sought out stories from the history of Edinburgh which will inspire, inform and amuse both visitors and residents of the city. We currently have tours available on the general history of science, the history of geology and the history of physics. More tours are currently in development.{'\n\n'}
            You can visit the places in our tours in an order that suits you, although the numbering suggests an order that would be convenient for a visitor to the city on foot or using public transport. We estimate that to see all the places on each of the tours should take approximately three hours, but you may choose to visit only those which are of special interest to you. You can choose from the lists of places to create your own itinerary based on your interests and the amount of time you have available.{'\n\n'}
            The map on the tour page will help you find the places and orientate yourself in the city. Most of the stops on our tour are within walking distance from Waverley station and the city centre, although for a some of the more distant ones some visitors may prefer to use Edinburgh’s excellent bus services. If you do decide to take the bus, you might find Lothian Transport’s route planner helpful.{'\n\n'}
             These tours are currently available on the website and on our app:
          </Text>
        </View>

        <View syle={styles.tours}>
          <View style={styles.tour}>
            <Image
              style={styles.image}
              source={{
                  uri: 'http://curiousedinburgh.org/wp-content/uploads/2016/04/Peter-Higgs-150x150.jpg',
              }}
            />
            <View style={styles.tourDetails}>
              <Text style={styles.tourTitle}>General Science Tour</Text>
              <Text style={styles.text}>From Charles Darwin to Higgs’ Boson  this tour will allow you to explore some of the places associated with major scientific and medical discoveries and personalities of the last five centuries, as well as some that are less famous, but deserve to be more widely known.</Text>
            </View>
          </View>

          <View style={styles.tour}>
            <Image
              style={styles.image}
              source={{
                  uri: 'http://curiousedinburgh.org/wp-content/uploads/2016/07/irish-elk-150x150.jpg',
              }}
            />
            <View style={styles.tourDetails}>
              <Text style={styles.tourTitle}>History of Geology</Text>
              <Text style={styles.text}>Edinburgh has a long association with the science of geology. Perhaps the most famous Edinburgh geologist is James Hutton, whose name will forever be associated with the idea of ‘deep time’. However, Edinburgh was also home to many other colourful characters and events in the history of this ‘sublime science’. You can learn about some of them here.</Text>
            </View>
          </View>

          <View style={styles.tour}>
            <Image
              style={styles.image}
              source={{
                  uri: 'http://curiousedinburgh.org/wp-content/uploads/2016/07/royal-obs-150x150.jpg',
              }}
            />
            <View style={styles.tourDetails}>
              <Text style={styles.tourTitle}>History of Physics</Text>
              <Text style={styles.text}>Some of the most important figures in the history of physics have called Edinburgh their home, from John Napier in the 16th century to Peter Higgs in the 21st. This tour will guide you through the fascinating stories of their lives and work.</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.text}>We would love to hear your comments about our website and app, which we are still developing and trialling over the coming months. To find out more about the team involved, how this project was developed and funded see our acknowledgements page.</Text>
        </View>

      </ScrollView>
    );
    /* eslint-enable */
}