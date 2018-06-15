import React, { Component } from 'react'
import {ScrollView, StyleSheet, Text} from 'react-native'
import Card from './common/card'

class EventList extends Component {
    static propTypes = {

    };

    render() {
        return (
            <ScrollView>
                {this.props.events.map(this.getEvent)}
            </ScrollView>
        )
    }

    getEvent = event =>
        <Card key = {event.uid}>
            <Text>{event.title}</Text>
        </Card>
}

const styles = StyleSheet.create({
})

export default EventList