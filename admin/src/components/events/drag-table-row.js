import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

class DragTableCell extends Component {
  static propTypes = {}

  render() {
    const { event, connectDragSource } = this.props
    return (
      <div style={{ height: 40 }}>
        {connectDragSource(<span>{event.title}</span>)}
      </div>
    )
  }
}

const spec = {
  beginDrag(props) {
    return {
      uid: props.event.uid,
      type: 'events'
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource()
})

export default DragSource('event', spec, collect)(DragTableCell)
