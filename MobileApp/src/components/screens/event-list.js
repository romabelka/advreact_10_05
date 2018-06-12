import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import EventList from '../events/event-list'

class EventListScreen extends Component {
    static propTypes = {

    };

    render() {
        return <EventList events = {[]}/>
    }
}

const styles = StyleSheet.create({
})

export default EventListScreen