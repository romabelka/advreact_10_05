import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchAllEvents,
  toggleSelection as handleSelect,
  eventListSelector,
  loadedSelector,
  loadingSelector,
  lastUIDSelector
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
    return (
      <div>
        <Table
          rowCount={events.length}
          width={400}
          height={300}
          rowGetter={this.rowGetter}
          rowHeight={50}
          overscanRowCount={0}
          onRowClick={this.handleRowClick}
          onScroll={this.handleScroll}
        >
          <Column dataKey="title" width={300} />
          <Column dataKey="where" width={300} />
          <Column dataKey="when" width={300} />
        </Table>
        {loading ? <Loader /> : null}
      </div>
    )
  }

  rowGetter = ({ index }) => this.props.events[index]

  handleRowClick = ({ index }) => {
    this.props.handleSelect(this.props.events[index].uid)
  }

  handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    if (scrollHeight - clientHeight - scrollTop <= 0) {
      this.props.fetchAllEvents(this.props.lastUID)
    }
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    lastUID: lastUIDSelector(state)
  }),
  { fetchAllEvents, handleSelect }
)(EventsTable)
