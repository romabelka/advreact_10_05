import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEvents, eventsSelector } from '../ducks/events'
import EventsList from '../components/events/events-list'

class PersonPage extends Component {
  componentWillMount() {
    this.props.fetchEvents()
  }

  render() {
    const { events } = this.props

    return (
      <div>
        <h2>Events</h2>
        {events.isFetched ? <EventsList /> : <h2>Loading...</h2>}
      </div>
    )
  }
}

export default connect((state) => ({ events: eventsSelector(state) }), {
  fetchEvents
})(PersonPage)
