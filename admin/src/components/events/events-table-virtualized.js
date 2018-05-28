import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchAllEvents,
  toggleSelection as handleSelect,
  eventListSelector,
  loadedSelector,
  loadingSelector
} from '../../ducks/events'
import Loader from '../common/loader'
import { Table, Column } from 'react-virtualized'
import 'react-virtualized/styles.css'

export class EventsTable extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchAllEvents && this.props.fetchAllEvents()
  }

  render() {
    const { loading, events } = this.props
    if (loading) return <Loader />
    return (
      <Table
        rowCount={events.length}
        width={400}
        height={300}
        rowGetter={this.rowGetter}
        rowHeight={50}
        overscanRowCount={0}
      >
        <Column dataKey="title" width={300} />
        <Column dataKey="where" width={300} />
        <Column dataKey="when" width={300} />
      </Table>
    )
  }

  rowGetter = ({ index }) => this.props.events[index]
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchAllEvents, handleSelect }
)(EventsTable)
