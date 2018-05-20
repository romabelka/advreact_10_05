import React, { Component } from 'react'
import EventList from '../components/event/event-list'

export default class EventListPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Events</h2>
        <EventList />
      </div>
    )
  }
}
