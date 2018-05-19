import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventsSelector } from '../../ducks/events'

class EventsList extends Component {
  static propTypes = {}

  render() {
    const { events } = this.props
    return (
      <ol>
        {Object.keys(events).map((key) => (
          <li key={key}>
            {events[key].title}
            <br />
            <b>Where:</b> {events[key].where}
            <br />
            <b>When:</b> {events[key].when}
          </li>
        ))}
      </ol>
    )
  }
}

export default connect((state) => ({
  events: eventsSelector(state)
}))(EventsList)
