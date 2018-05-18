import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image,
         Linking,
         ListView,
         ScrollView,
         Text,
         TouchableHighlight,
         View } from 'react-native';
import styles from './styles/About';

const banner = require('../assets/curious-edinburgh-banner.png');

export default class About extends Component {

    constructor(props) {
        super(props);

        // navigation tab reference
        this.tabView = this.props.tabView;

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.tours),
        };
    }

    _onPressTour(tour) {
        // register change of tour
        this.props.onValueChange(tour.id);

        // navigate to map
        this.tabView.goToPage(0);
    }

    render() {
    /* eslint-disable max-len */
        return (
          <ScrollView style={styles.page}>
            <View style={styles.header}>
              <Image
                source={banner}
                style={styles.banner}
              />
            </View>
            <View style={styles.para}>
              <Text style={styles.title}>What is Curious Edinburgh?</Text>
              <Text style={styles.text}>Are you interested in the fascinating and important scientific, medical and technological heritage of the city of Edinburgh? The tours available in this app will be your guide to the history of ideas in the Athens of the North. We have sought out stories from the history of Edinburgh which will inspire, inform and amuse both visitors and residents of the city.{'\n\n'}
              Tours available in this app include the general history of science, the history of geology, the history of physics, the history of medicine, the history of genetics and biotechnology and the Scottish Enlightenment. You can find out more about each of these tours, and our occasional events, at <Text style={styles.href} onPress={() => Linking.openURL('http://curiousedinburgh.org/')}>curiousedinburgh.org</Text>.
              </Text>
            </View>

            <View style={styles.para}>
              <Text style={styles.title}>Explore the tours:</Text>
              <ListView
                dataSource={
                    this.state.dataSource
                }
                renderRow={
                  rowData =>
                    <TouchableHighlight
                      onPress={
                          () => this._onPressTour(rowData)
                      }
                    >
                      <Text style={styles.tour}>{`\u2022 ${rowData.name}`}</Text>
                    </TouchableHighlight>
                }
              />
              <Text style={styles.text}>We have more tours in development and always welcome your feedback and suggestions. Share your experience, photos, reflections on the app and tours with the hashtag: #curiousedinburgh.</Text>
            </View>

            <View style={styles.para}>
              <Text style={styles.title}>Planning your tour</Text>
              <Text style={styles.text}>You can visit the places in our tours in an order that suits you, although the numbering suggests an order that would be convenient for a visitor to the city on foot or using public transport. We estimate that to see all the places on each of the tours should take approximately three hours, but you may choose to visit only those which are of special interest to you. You can choose from the lists of places to create your own itinerary based on your interests and the amount of time you have available..{'\n\n'}
              The map will help you find the places and orientate yourself in the city. Most of the stops on our tour are within walking distance from Waverley station and the city centre, although for some of the more distant ones some visitors may prefer to use Edinburgh’s excellent bus services. If you do decide to take the bus, you might find <Text style={styles.href} onPress={() => Linking.openURL('https://lothianbuses.co.uk/getting-around/journey-planner')}>Lothian Transport’s route planner</Text> helpful.
              </Text>
            </View>

            <View style={styles.para}>
              <Text style={styles.title}>Find out more:</Text>
              <Text style={styles.text}>To find out more about the team involved, how this project was developed and funded see the <Text style={styles.href} onPress={() => Linking.openURL('http://curiousedinburgh.org/acknowledgements/')}>acknowledgements page</Text> on our website, <Text style={styles.href} onPress={() => Linking.openURL('http://curiousedinburgh.org/')}>curiousedinburgh.org</Text>
.{'\n\n'}
              We would particularly love to hear your comments about the tours, the app, and the website. Contact us via our website or share your comments on social media with the tag #curiousedinburgh.</Text>
            </View>

          </ScrollView>
        );
        /* eslint-enable */
    }
}

About.propTypes = {
    onValueChange: PropTypes.func.isRequired,
    tabView: PropTypes.instanceOf(Object),
    tours: PropTypes.arrayOf(PropTypes.object).isRequired,
};

About.defaultProps = {
    tabView: {},
};
