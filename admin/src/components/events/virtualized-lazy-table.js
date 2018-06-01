import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadingSelector,
  loadedSelector,
  fetchLazy,
  toggleSelection,
  eventListSelector
} from '../../ducks/events'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import DragTableCell from './drag-table-row'
import 'react-virtualized/styles.css'

export class EventLazyTable extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchLazy()
  }

  render() {
    const { loaded, events } = this.props
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        rowCount={loaded ? events.length : events.length + 1}
        loadMoreRows={this.loadMoreRows}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            ref={registerChild}
            rowCount={events.length}
            rowGetter={this.rowGetter}
            rowHeight={40}
            headerHeight={50}
            overscanRowCount={1}
            width={700}
            height={300}
            onRowClick={this.handleRowClick}
            onRowsRendered={onRowsRendered}
            rowClassName="test__event_table_row"
          >
            <Column
              label="title"
              cellRenderer={this.cellRenderer}
              dataKey="title"
              width={300}
            />
            <Column label="where" dataKey="where" width={250} />
            <Column label="when" dataKey="month" width={150} />
          </Table>
        )}
      </InfiniteLoader>
    )
  }

  isRowLoaded = ({ index }) => index < this.props.events.length

  loadMoreRows = () => {
    this.props.fetchLazy()
  }

  rowGetter = ({ index }) => {
    return this.props.events[index]
  }

  handleRowClick = ({ rowData }) => {
    const { toggleSelection } = this.props
    toggleSelection && toggleSelection(rowData.uid)
  }

  cellRenderer = (props) => (
    <DragTableCell key={props.key} event={props.rowData} />
  )
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchLazy, toggleSelection }
)(EventLazyTable)
