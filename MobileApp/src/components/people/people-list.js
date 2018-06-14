import React, { Component } from 'react'
import { Text, StyleSheet, SectionList } from 'react-native'
import PersonCard from './person-card'
import groupBy from 'lodash/groupBy'

class PeopleList extends Component {
  static propTypes = {}

  render() {
    const grouped = groupBy(this.props.people, (person) =>
      person.firstName.charAt(0)
    )
    const sections = Object.entries(grouped).map(([letter, list]) => ({
      title: `${letter}, ${list.length} people`,
      data: list.map((person) => ({ key: person.uid, person }))
    }))
    return (
      <SectionList
        style={styles.sectionList}
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

export default PeopleList
