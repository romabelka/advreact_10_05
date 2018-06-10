import React, {Component} from 'react'
import {Button, View, StyleSheet, Text, SectionList, NavigatorIOS} from 'react-native'
import Card from './common/card'

import EventScreen from './event-screen-1'


class EventList extends Component {
  static propTypes = {};

  render() {
    const sections = Object
      .entries(this.props.events
        .reduce((acc, event) => {
          const firstLetter = event.title[0].toUpperCase()
          acc[firstLetter] = [...acc[firstLetter] || [], event.title]
          return acc;
        }, {}))
      .map(([firstLetter, data]) => ({firstLetter, data}))
      .sort((a, b) => a.firstLetter > b.firstLetter)

    return (
      <SectionList
        renderItem={({item, index, section}) =>
          <Text key={index}
                onPress={() => alert(item)}
                style = {styles.item}
          >{item}
          </Text>
        }
        renderSectionHeader={({section: {firstLetter}}) =>
          <View style={styles.firstLetterView}>
            <Text style={styles.firstLetter}>{firstLetter}</Text>
          </View>
        }
        sections={sections}
        keyExtractor={(item, index) => item + index}
      />
      /*
        <SectionList>
            {this.props.events.map(event =>
                <Card key = {event.uid}>
                    <Text>{event.title}</Text>
                </Card>
            )}
        </SectionList>*/


    )
  }

}

const styles = StyleSheet.create({
  firstLetter: {
    textAlign: 'center',
    margin: 5,
    fontSize: 20,
    fontFamily: 'HelveticaNeue-Bold',
  },
  firstLetterView: {
    backgroundColor: '#fff'
  },
  item : {
    margin: 5,
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'HelveticaNeue-Light',
  }
})


export default EventList