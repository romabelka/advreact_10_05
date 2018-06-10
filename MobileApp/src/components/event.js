import React, { Component } from 'react'
import {View, StyleSheet, Text} from 'react-native'

class Event extends Component {
    static propTypes = {

    }

    render() {
        const {event} = this.props

        return (
            <View style = {styles.container}>
                <Text>Selected event:{"\n"}</Text>

                {Object.entries(event).map(([key, value]) => <Text key={key}>{`${key}: ${value}`}</Text>)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DDD',
        marginTop: 10,
        marginBottom: 30,
        padding: 5,
    }
})

export default Event
