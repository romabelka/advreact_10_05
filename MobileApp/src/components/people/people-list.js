import React, { Component } from 'react'
import { Text, StyleSheet, SectionList } from 'react-native'
import PersonCard from './person-card'
import groupBy from 'lodash/groupBy'

class PeopleList extends Component {
  render() {
    const grouped = groupBy(this.props.people, (person) =>
      person.firstName.charAt(0)
    )
    const sections = Object.entries(grouped).map(([letter, list]) => ({
      title: letter,
      data: list.map((person) => ({ key: person.uid, person }))
    }))
    return (
      <SectionList
        sections={sections}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <PersonCard person={item.person} key={item.key} />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
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

export default PeopleList
