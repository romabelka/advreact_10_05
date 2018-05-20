import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../ducks/events'
import NewPersonForm from '../components/events/new-event-form'
import EventsList from '../components/events/events-list'

class EventPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Add new event</h2>
        <EventsList />
        <NewPersonForm onSubmit={this.props.addEvent} />
      </div>
    )
  }
}

export default connect(null, { addEvent })(EventPage)
