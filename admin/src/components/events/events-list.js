import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventsSelector } from '../../ducks/events'

class EventList extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        {this.props.events.map((event) => (
          <li key={event.id}>
            <p>{event.title}</p>
            <p>{event.url}</p>
            <p>{event.where}</p>
            <p>{event.month}</p>
            <p>{event.when}</p>
            <p>{event.submissionDeadline}</p>
          </li>
        ))}
      </div>
    )
  }
}

export default connect((state) => ({
  events: eventsSelector(state)
}))(EventList)
