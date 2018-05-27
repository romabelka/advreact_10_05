import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchEventsWithPagination,
  toggleSelection as handleSelect,
  eventListSelector,
  loadedSelector,
  loadingSelector,
  loadedRowCount,
  loadingRowCount,
  loadedRowsMap,
  clearData,
  changeLoadingInfo
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
  // state = {
  //   // loadedRowCount: 0,
  //   loadedRowsMap: {}
  //   // loadingRowCount: 0
  // }
  static propTypes = {}

  componentDidMount() {
    this.props.fetchEventsWithPagination &&
      this.props.fetchEventsWithPagination()
  }

  componentWillUnmount() {
    Object.keys(this.timeoutIdMap).forEach((timeoutId) => {
      clearTimeout(timeoutId)
    })
  }

  render() {
    const {
      loading,
      // loaded,
      events,
      clearData,
      loadedRowCount,
      loadingRowCount
    } = this.props

    return (
      <div>
        <div>
          <button onClick={clearData}>Flush Cached Data</button>
          <br />
          <br />

          <div>
            {loadingRowCount} loading, {loadedRowCount} loaded
          </div>
          <br />
          <hr />
        </div>
        {loading && !loadedRowCount ? (
          <Loader />
        ) : (
          <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadMoreRows}
            rowCount={events.length}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    ref={registerChild}
                    height={height}
                    onRowsRendered={onRowsRendered}
                    rowCount={events.length}
                    rowHeight={rowHeight}
                    rowRenderer={this.rowRenderer}
                    width={width}
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        )}
      </div>
    )
  }

  handleRowClick = (event) => () => {
    this.props.handleSelect(event.uid)
  }

  timeoutIdMap = () => {}

  isRowLoaded = ({ index }) => {
    const { loadedRowsMap } = this.props
    return !!loadedRowsMap[index] // STATUS_LOADING or STATUS_LOADED
  }

  loadMoreRows = ({ startIndex, stopIndex }) => {
    const { loadedRowsMap, loadingRowCount } = this.props
    const increment = stopIndex - startIndex + 1

    for (var i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = STATUS_LOADING
    }

    this.props.changeLoadingInfo({
      loadingRowCount: loadingRowCount + increment
    })

    const timeoutId = setTimeout(() => {
      const { loadedRowCount, loadingRowCount } = this.props
      delete this.timeoutIdMap[timeoutId]

      for (var i = startIndex; i <= stopIndex; i++) {
        loadedRowsMap[i] = STATUS_LOADED
      }

      this.props.changeLoadingInfo({
        loadingRowCount: loadingRowCount - increment,
        loadedRowCount: loadedRowCount + increment
      })

      promiseResolver({
        size: loadingRowCount,
        startAt: startIndex,
        endAt: stopIndex
      })
    }, 1000 + Math.round(Math.random() * 2000))

    this.timeoutIdMap[timeoutId] = true

    let promiseResolver

    return new Promise((resolve) => {
      promiseResolver = (pagination) =>
        resolve(this.props.fetchEventsWithPagination(pagination))
    })
  }

  rowRenderer = ({ index, key, style }) => {
    const { events, loadedRowsMap } = this.props

    const row = events[index]
    let content

    if (loadedRowsMap[index] === STATUS_LOADED) {
      content = row.title
    } else {
      content = <div style={{ width: 100 }} />
    }

    return (
      <div key={key} style={style} onClick={this.handleRowClick(row)}>
        {content}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    loadedRowCount: loadedRowCount(state),
    loadingRowCount: loadingRowCount(state),
    loadedRowsMap: loadedRowsMap(state)
  }),
  { fetchEventsWithPagination, handleSelect, clearData, changeLoadingInfo }
)(EventsTable)
