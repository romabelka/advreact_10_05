import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { eventsListSelector } from '../../ducks/events'

class EventsList extends Component {
  static propTypes = {}

  render() {
    const { events } = this.props
    console.log(events)
    return !!Object.keys(events).length ? (
      <table cellPadding={20} border="1" cellSpacing={0}>
        <thead>
          <tr>
            <th>Month</th>
            <th>Submission Deadline</th>
            <th>Title</th>
            <th>url</th>
            <th>When</th>
            <th>Where</th>
          </tr>
        </thead>
        <tbody>
          {_.map(events, (event, key) => (
            <tr key={key}>
              <td>{event.month}</td>
              <td>
                {!!event.submissionDeadline ? event.submissionDeadline : 'None'}
              </td>
              <td>{event.title}</td>
              <td>
                <a href={event.url} target="_blank">
                  {event.url}
                </a>
              </td>
              <td>{event.when}</td>
              <td>{event.where}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <h2>No events now</h2>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  events: eventsListSelector
})

export default connect(mapStateToProps)(EventsList)
