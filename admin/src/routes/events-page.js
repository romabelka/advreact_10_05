import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventsList from '../components/events/events-list'
import { fetchEvents, stateSelector } from '../ducks/events'

class EventsPage extends Component {
  static propTypes = {}

  componentWillMount = () => {
    if (this.props.loading || this.props.loaded) return

    this.props.fetchEvents()
  }

  render() {
    const { loading, loaded } = this.props

    const body = loading && !loaded ? <b>Loading...</b> : <EventsList />

    return (
      <div>
        <h2>Events</h2>
        {body}
      </div>
    )
  }
}

export default connect(
  (state) => {
    const { loading, loaded } = stateSelector(state)
    return { loading, loaded }
  },
  { fetchEvents }
)(EventsPage)
