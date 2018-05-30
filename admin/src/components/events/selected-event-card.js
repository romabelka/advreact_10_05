import React, { Component } from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import { connect } from 'react-redux'
import { addEventToPerson } from '../../ducks/people'

class SelectedEventCard extends Component {
  static propTypes = {}

  render() {
    console.log('props!')
    console.log(this.props.event.uid)
    const { event, connectDropTarget, canReceive, hovered } = this.props
    const borderColor = canReceive ? (hovered ? 'green' : 'red') : 'black'
    return connectDropTarget(
      <div style={{ border: `1px solid ${borderColor}` }}>
        {this.props.connectDragSource(<h3>{event.title}</h3>)}
        <h4>{event.where}</h4>
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const { addEventToPerson, event } = props
    addEventToPerson(event.uid, monitor.getItem().uid)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canReceive: monitor.canDrop(),
  hovered: monitor.isOver()
})

const dragSpec = {
  beginDrag(props) {
    return {
      uid: props.event.uid
    }
  }
}

const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource()
})

export default connect(
  null,
  { addEventToPerson }
)(
  DropTarget(['person'], spec, collect)(
    DragSource('event', dragSpec, dragCollect)(SelectedEventCard)
  )
)
