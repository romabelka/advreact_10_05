import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addEventToPerson } from '../../ducks/people'

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
    const { addEventToPerson, event } = props
    addEventToPerson(event.uid, monitor.getItem().uid)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canReceive: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default connect(null, { addEventToPerson })(
  DropTarget(['person'], spec, collect)(SelectedEventCard)
)
