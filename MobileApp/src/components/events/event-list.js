import React, { Component } from 'react'
import { Text, StyleSheet, SectionList } from 'react-native'
import EventCard from './event-card'
import groupBy from 'lodash/groupBy'

class EventList extends Component {
  static propTypes = {}

  render() {
    console.log(this.props)

    const grouped = groupBy(this.props.events, (event) => event.title.charAt(0))
    const sections = Object.entries(grouped).map(([letter, list]) => ({
      title: `${letter}, ${list.length} events`,
      data: list.map((event) => ({ key: event.uid, event }))
    }))
    return (
      <SectionList
        style={styles.sectionList}
        sections={sections}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <EventCard event={item.event} key={item.key} />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  sectionList: {
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    backgroundColor: '#F0F0F0',
    height: 40,
    lineHeight: 40,
    marginBottom: 5,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.3,
    elevation: 3
  }
})

export default EventList
