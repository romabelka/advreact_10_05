import React, {Component} from 'react'
import {Button, View, StyleSheet, Text, SectionList, NavigatorIOS} from 'react-native'
import Card from './common/card'

import EventScreen from './event-screen-1'


class EventList extends Component {
  static propTypes = {};

  render() {
    return (
      <SectionList
        renderItem={({item, index, section}) =>
            <Text key={index} onPress={() => alert(123)}>{item}</Text>
        }
        renderSectionHeader={({section: {title}}) => (
          <Text style={{fontWeight: 'bold'}}>{title}</Text>
        )}
        sections={this.props.events.map(({title, where, when}) => ({title, data: [where, when]}))}
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

  openEvent() {
    console.log(123)
  }
}

const styles = StyleSheet.create({})


export default EventList