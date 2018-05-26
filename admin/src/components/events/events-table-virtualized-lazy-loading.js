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
import { InfiniteLoader, AutoSizer, List } from 'react-virtualized'
import 'react-virtualized/styles.css'

export const width = 900
export const columnWidth = 300
export const height = 420
export const rowHeight = 40

const STATUS_LOADING = 1
const STATUS_LOADED = 2

export class EventsTable extends Component {
  state = {
    loadedRowCount: 0,
    loadedRowsMap: {},
    loadingRowCount: 0
  }
  static propTypes = {}

  componentDidMount() {
    this.props.fetchAllEvents && this.props.fetchAllEvents()
  }

  componentWillUnmount() {
    Object.keys(this._timeoutIdMap).forEach((timeoutId) => {
      clearTimeout(timeoutId)
    })
  }

  render() {
    const { loading, events } = this.props
    const { loadedRowCount, loadingRowCount } = this.state
    if (loading) return <Loader />
    return (
      <div>
        <div>
          <button onClick={this._clearData}>Flush Cached Data</button>

          <div>
            {loadingRowCount} loading, {loadedRowCount} loaded
          </div>
        </div>

        <InfiniteLoader
          isRowLoaded={this._isRowLoaded}
          loadMoreRows={this._loadMoreRows}
          rowCount={events.length}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  ref={registerChild}
                  // className={styles.List}
                  height={height}
                  onRowsRendered={onRowsRendered}
                  rowCount={events.length}
                  rowHeight={rowHeight}
                  rowRenderer={this._rowRenderer}
                  width={width}
                />
              )}
            </AutoSizer>
          )}
          {/* <Table
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
              </Table> */}
        </InfiniteLoader>
      </div>
    )
  }

  // rowGetter = ({ index }) => this.props.events[index]
  //
  // handleRowClick = (event) => () => {
  //   this.props.handleSelect(event.uid)
  // }

  _timeoutIdMap = () => {}

  _clearData = () => {
    this.setState({
      loadedRowCount: 0,
      loadedRowsMap: {},
      loadingRowCount: 0
    })
  }

  _isRowLoaded = ({ index }) => {
    const { loadedRowsMap } = this.state
    return !!loadedRowsMap[index] // STATUS_LOADING or STATUS_LOADED
  }

  _loadMoreRows = ({ startIndex, stopIndex }) => {
    const { loadedRowsMap, loadingRowCount } = this.state
    const increment = stopIndex - startIndex + 1

    for (var i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = STATUS_LOADING
    }

    this.setState({
      loadingRowCount: loadingRowCount + increment
    })

    const timeoutId = setTimeout(() => {
      const { loadedRowCount, loadingRowCount } = this.state

      delete this._timeoutIdMap[timeoutId]

      for (var i = startIndex; i <= stopIndex; i++) {
        loadedRowsMap[i] = STATUS_LOADED
      }

      this.setState({
        loadingRowCount: loadingRowCount - increment,
        loadedRowCount: loadedRowCount + increment
      })

      promiseResolver()
    }, 1000 + Math.round(Math.random() * 2000))

    this._timeoutIdMap[timeoutId] = true

    let promiseResolver

    return new Promise((resolve) => {
      promiseResolver = resolve
    })
  }

  _rowRenderer = ({ index, key, style }) => {
    const { events } = this.props
    const { loadedRowsMap } = this.state

    const row = events[index]
    let content
    // console.log(row.size)

    if (loadedRowsMap[index] === STATUS_LOADED) {
      content = row.title
    } else {
      content = <div style={{ width: 100 }} />
    }

    return <div key={key}>{content}</div>
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
