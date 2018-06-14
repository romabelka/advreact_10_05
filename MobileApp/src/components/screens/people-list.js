import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import EventList from '../events/event-list'
import fixtures from '../../../fixtures.json'

class PeopleListScreen extends Component {
  static propTypes = {}

  render() {
    return (
      <View>
        <Text style={styles.header}>People list</Text>
        <EventList
          events={Object.entries(fixtures.events).map(([uid, event]) => ({
            ...event,
            uid
          }))}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    padding: 20
  }
})

export default PeopleListScreen
