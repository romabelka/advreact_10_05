import React, { Component } from 'react'
import { loadEvents } from '../ducks/events'
import { connect } from 'react-redux'

class Events extends Component {
  static propTypes = {}

  componentWillMount() {
    this.checkAndLoad(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.checkAndLoad(nextProps)
  }

  checkAndLoad({ events, loadEvents }) {
    if (!events || events.count() === 0) loadEvents()
  }

  getRow(conference, index) {
    return (
      <tr key={index}>
        <td>{conference.title}</td>
        <td>{conference.month}</td>
        <td>{conference.where}</td>
        <td>{conference.when}</td>
        <td>{conference.url ? <a href={conference.url}>перейти</a> : ''}</td>
      </tr>
    )
  }

  render() {
    const { events } = this.props
    const rows = []
    events.forEach((conference, index) =>
      rows.push(this.getRow(conference, index))
    )
    const table = (
      <table>
        <tbody>
          <tr>
            <th>Мероприятие</th>
            <th>Месяц</th>
            <th>Место</th>
            <th>Период</th>
            <th>Сайт</th>
          </tr>
          {rows}
        </tbody>
      </table>
    )

    return (
      <div>
        <h1>Events</h1>
        {table}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.events.entities
  }
}

export default connect(mapStateToProps, { loadEvents })(Events)
