import React, { Component } from 'react'
import {SectionList, StyleSheet, Text} from 'react-native'
import Card from './common/card'

class EventList extends Component {
    static propTypes = {

    };

    getFitstLetterOfEvent = event => {
        return event.title.charAt(0)
    }

    getFilterEvents = letter => {
        const {events} = this.props
        const filterEvents = events.filter(event => this.getFitstLetterOfEvent(event) === letter)
        return filterEvents.map(event => event.title)
    }

    render() {
        const {events} = this.props
        const firstLettersofEvents = [...new Set(events.map(event => this.getFitstLetterOfEvent(event)))].sort()

        return (
            <SectionList
              style={{width: 300}}
              renderItem={({item, index, section}) =>
                <Card key = {index}>
                    <Text>{item}</Text>
                </Card>
              }
              renderSectionHeader={({section: {title}}) => (
                <Text style={{fontWeight: 'bold'}}>{title}</Text>
              )}
              sections={firstLettersofEvents.map(letter =>
                  ({title: letter, data: this.getFilterEvents(letter)})
              )}
              keyExtractor={(item, index) => item + index}
            />
        )
    }
}

const styles = StyleSheet.create({
})

export default EventList
