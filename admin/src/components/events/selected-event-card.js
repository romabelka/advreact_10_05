import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'

class SelectedEventCard extends Component {
  static propTypes = {}

  render() {
    const { event, connectDropTarget, canReceive, hovered } = this.props
    const borderColor = canReceive ? (hovered ? 'green' : 'red') : 'black'
    return connectDropTarget(
      <div style={{ border: `1px solid ${borderColor}` }}>
        <h3>{event.title}</h3>
        <h4>{event.where}</h4>
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    console.log('---', monitor)
    console.log(
      '---',
      'event: ',
      props.event.uid,
      'person: ',
      monitor.getItem().uid
    )
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canReceive: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default DropTarget(['person'], spec, collect)(SelectedEventCard)
