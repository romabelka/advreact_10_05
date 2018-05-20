import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventSelector, getListEvent } from '../../ducks/event'
import Event from './event'

class EventList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.getListEvent()
  }

  render() {
    const { loaded, error, loading } = this.props.event
    if (loading) {
      return (
        <div>
          <p>Загрузка...</p>
        </div>
      )
    } else if (error) {
      return (
        <div>
          <p>Произошла ошибка</p>
        </div>
      )
    } else if (loaded) {
      return (
        <div>
          {this.props.eventList.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </div>
      )
    }

    return null
  }
}

export default connect(
  (state) => ({
    eventList: eventSelector(state),
    event: state.event
  }),
  { getListEvent }
)(EventList)
