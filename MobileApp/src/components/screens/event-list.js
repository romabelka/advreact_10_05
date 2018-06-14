import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react'
import EventList from '../events/event-list'
import Loader from '../common/loader'

@inject('events')
@observer
class EventListScreen extends Component {
  static propTypes = {}

  componentDidMount() {
    if (!this.props.events.loading && !this.props.events.loaded) {
      this.props.events.getAllEvents()
    }
  }

  render() {
    if (this.props.events.loading) {
      return <Loader />
    }
    return (
      <View>
        <Text style={styles.header}>Events list</Text>
        <EventList events={this.props.events.entities} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    padding: 20
  }
})

export default EventListScreen
