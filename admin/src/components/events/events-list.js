import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventsSelector, getEvents } from '../../ducks/events'
import Event from './event'

class EventsList extends Component {
  componentDidMount() {
    this.props.getEvents()
  }
  render() {
    return (
      <div>
        <ol>
          {this.props.events.map((event) => (
            <li key={event.id}>
              <Event event={event} />
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    events: eventsSelector(state)
  }),
  { getEvents }
)(EventsList)
