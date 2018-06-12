import React, { Component } from 'react'
import {SectionList, Text, TouchableOpacity, View} from 'react-native'
import Card from './common/card'
import Event from './event'

class EventList extends Component {
    static propTypes = {

    };

    state = {
        currentEvent: null
    }

    showEvent = (event) => {
        this.setState({ currentEvent: event })
    }

    getFitstLetterOfEvent = event => {
        return event.title.charAt(0)
    }

    getFilterEvents = letter => {
        const {events} = this.props
        return events.filter(event => this.getFitstLetterOfEvent(event) === letter)
    }

    render() {
        const {events} = this.props
        const {currentEvent} = this.state
        const firstLettersofEvents = [...new Set(events.map(event => this.getFitstLetterOfEvent(event)))].sort()

        return (
            <View>
                {currentEvent && <Event event={currentEvent} />}
                <SectionList
                  style={{width: 300}}
                  renderItem={({item, index, section}) =>
                      <TouchableOpacity onPress={() => this.showEvent(item)}>
                          <Card key = {index}>
                              <Text>{item.title}</Text>
                          </Card>
                      </TouchableOpacity>
                  }
                  renderSectionHeader={({section: {title}}) => (
                    <Text style={{fontWeight: 'bold'}}>{title}</Text>
                  )}
                  sections={firstLettersofEvents.map(letter =>
                      ({title: letter, data: this.getFilterEvents(letter)})
                  )}
                  keyExtractor={(item, index) => item + index}
                />
            </View>
        )
    }
}

export default EventList
