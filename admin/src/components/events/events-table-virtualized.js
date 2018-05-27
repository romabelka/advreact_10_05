import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchLazyEvents,
  toggleSelection as handleSelect,
  eventListSelector,
  loadedSelector,
  loadingSelector
} from '../../ducks/events'
import { InfiniteLoader, Table, Column } from 'react-virtualized'
import 'react-virtualized/styles.css'

export class EventsTable extends Component {
  static propTypes = {}

  componentDidMount() {
    this.fetchEvents()
  }

  render() {
    const { events, loaded } = this.props
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.fetchEvents}
        rowCount={loaded ? events.length : events.length + 10}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            ref={registerChild}
            onRowsRendered={onRowsRendered}
            rowCount={events.length}
            width={400}
            height={300}
            rowGetter={this.rowGetter}
            rowHeight={50}
            overscanRowCount={0}
            rowClassName="test--event-list_item"
          >
            <Column dataKey="title" width={300} />
            <Column dataKey="where" width={300} />
            <Column dataKey="when" width={300} />
          </Table>
        )}
      </InfiniteLoader>
    )
  }

  fetchEvents = () => {
    this.props.fetchLazyEvents && this.props.fetchLazyEvents()
  }

  isRowLoaded = () => this.props.loaded

  rowGetter = ({ index }) => this.props.events[index]
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchLazyEvents, handleSelect }
)(EventsTable)
