import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { StyleSheet } from 'react-native'
import EventList from '../events/event-list'
import Loader from '../common/loader'

@inject('events')
@observer
class EventListScreen extends Component {
  static propTypes = {}

  componentDidMount() {
    if (!this.props.events.loading && !this.props.events.loaded) {
      this.props.events.fetchAll()
    }
  }

  render() {
    if (this.props.events.loading) {
      return <Loader />
    }

    return <EventList events={this.props.events.entities} />
  }
}

const styles = StyleSheet.create({})

export default EventListScreen
