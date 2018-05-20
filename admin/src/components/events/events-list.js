import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventsSelector, getEventsList } from '../../ducks/events'
import { fieldsConfig as eventFields } from './new-event-form'

class EventList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.dispatch(getEventsList())
  }

  render() {
    const { events } = this.props

    return (
      <div>
        {events.length ? (
          <table>
            <thead>
              <tr>
                {eventFields.map((field, i) => <th key={i}>{field.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => (
                <tr key={i}>
                  <td>{event.title}</td>
                  <td>{event.url}</td>
                  <td>{event.where}</td>
                  <td>{event.month}</td>
                  <td>{event.when}</td>
                  <td>{event.submissionDeadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>The events have not yet been created</div>
        )}
      </div>
    )
  }
}

export default connect((state) => ({
  events: eventsSelector(state)
}))(EventList)
