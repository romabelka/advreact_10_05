import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  eventsSelector,
  loadingSelector,
  loadedSelector,
  fetchEvents
} from '../../ducks/events'

class EventsList extends Component {
  componentDidMount() {
    this.fetchEvents()
  }

  fetchEvents = () => {
    if (this.props.loading || this.props.loaded) return

    this.props.fetchEvents()
  }

  render() {
    if (this.props.loading) return 'Loading...'

    return (
      <ul>
        {this.props.events.map(({ id, title, url, where, when }) => (
          <li key={id}>
            <a href={url}>{title}</a> in {where} at {when}
          </li>
        ))}
      </ul>
    )
  }
}

export default connect(
  (state) => ({
    events: eventsSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchEvents }
)(EventsList)
