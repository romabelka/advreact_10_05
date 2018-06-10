import React, { Component } from 'react'
import {SectionList, StyleSheet, Text} from 'react-native'
import Card from './common/card'

class EventList extends Component {
    static propTypes = {

    };

    render() {
        const eventsGroupedByFirstLetter = this.props.events.reduce(
            (acc, event) => {
                const firstLetter = event.title.charAt(0).toUpperCase()
                return {
                    ...acc,
                    [firstLetter]: [...(acc[firstLetter] || []), event]
                }
            },
            {}
        )
        const sections = Object.entries(eventsGroupedByFirstLetter).map(
            ([title, data]) => ({ title, data })
        )

        return (
            <SectionList
                renderItem={({ item, index }) => (
                    <Card key={index}>
                        <Text>{item.title}</Text>
                    </Card>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text>{title}</Text>
                )}
                sections={sections}
                keyExtractor={(item, index) => item.uid + index}
            />
        )
    }
}

const styles = StyleSheet.create({
})

export default EventList