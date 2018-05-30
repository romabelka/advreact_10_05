import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deletePerson } from '../../ducks/people'
import { deleteEvent } from '../../ducks/events'
import './recycle-bin.css'

class recycleBin extends Component {
  static defaultProps = {}

  static propTypes = {}

  state = {}

  render() {
    const { connectDropTarget, canReceive, hovered } = this.props
    const borderColor = canReceive ? (hovered ? 'green' : 'red') : 'black'
    return connectDropTarget(
      <div className={'trash'} style={{ border: `1px solid ${borderColor}` }}>
        trash
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const { deleteEvent, deletePerson, person, event } = props
    switch (monitor.getItemType()) {
      case 'person': {
        deletePerson(monitor.getItem().uid)
        break
      }
      case 'event': {
        deleteEvent(monitor.getItem().uid)
        break
      }
      default:
        break
    }
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canReceive: monitor.canDrop(),
  hovered: monitor.isOver()
})
export default connect(
  null,
  { deletePerson, deleteEvent }
)(DropTarget(['person', 'event'], spec, collect)(recycleBin))
