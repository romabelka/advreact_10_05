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
        <NewPersonForm onSubmit={this.props.addEvent} />

        <h2>Events list</h2>
        <EventsList />
      </div>
    )
  }
}

export default connect(null, { addEvent })(EventPage)
