import React, {Component} from 'react'
import {Text, SectionList} from 'react-native'
import Card from './common/card'

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
    const {navigate} = this.props.navigation
    return (

      <SectionList
        renderItem={({item}) => <Card key={item.uid}
        ><Text
          navigation={this.props.navigation}
          onPress={() =>
            navigate('Card', {
              item: item,
              navigation: this.props.navigation
            })
          }
        >{item.title}</Text></Card>}
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
