import React, {Component} from 'react'
import {Text, SectionList} from 'react-native'

class EventList extends Component {
  static propTypes = {};

  render() {
    const reducer = (acc, event) => {
      const letter = event.title.charAt(0).toUpperCase()
      if (!acc[letter]) {
        acc[letter] = [event]
      } else {
        acc[letter].push(event)
      }
      return acc
    }
    const secObj = this.props.events.reduce(reducer, {})

    const secArrObj = Object.keys(secObj).reduce(
      (acc, key) => {
        acc.push({title: key, data: secObj[key]})
        return acc
      },
      []
    )

    return (

      <SectionList
        renderItem={({item}) => <Text key={item.uid}>{item.title}</Text>}
        renderSectionHeader={({section: {title}}) => (
          <Text style={{fontWeight: 'bold'}}>{title}</Text>
        )}
        sections={secArrObj}
        keyExtractor={(item, index) => item + index}
      />
    )
  }
}

export default EventList
