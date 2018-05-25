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

export const width = 900
export const columnWidth = 300
export const height = 420
export const rowHeight = 40

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
        width={width}
        height={height}
        rowGetter={this.rowGetter}
        rowHeight={rowHeight}
        overscanRowCount={0}
      >
        <Column
          cellRenderer={({ cellData, rowData }) => (
            <div
              className="test--event-list_item"
              onClick={this.handleRowClick(rowData)}
            >
              {cellData}
            </div>
          )}
          dataKey="title"
          width={columnWidth}
        />
        <Column dataKey="where" width={columnWidth} />
        <Column dataKey="when" width={columnWidth} />
      </Table>
    )
  }

  rowGetter = ({ index }) => this.props.events[index]

  handleRowClick = (event) => () => {
    this.props.handleSelect(event.uid)
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchAllEvents, handleSelect }
)(EventsTable)
