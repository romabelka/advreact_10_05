import React, { Component } from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import Card from '../common/card'
import {observer, inject} from 'mobx-react'
import { eventStore } from "../../stores";

@inject('eventStore')
@observer
class EventCard extends Component {
    static propTypes = {

    };

    render() {
        const { event } = this.props
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.eventStore.setEvent(event)
            }}
          >
            <Card>
                <Text>{event.title}</Text>
            </Card>
          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventCard