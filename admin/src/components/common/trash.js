import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { deletePerson } from '../../ducks/people'
import { deleteEvent } from '../../ducks/events'

const style = {
  position: 'fixed',
  top: 0,
  right: 0,
  fontSize: '10em'
}

class Trash extends Component {
  render() {
    const { connectDropTarget } = this.props
    return connectDropTarget(<div style={style}>🗑</div>)
  }
}

const spec = {
  drop(props, monitor) {
    const { deletePerson, deleteEvent } = props
    const itemType = monitor.getItemType()
    const uid = monitor.getItem().uid

    if (itemType === 'person') {
      deletePerson(uid)
    }

    if (itemType === 'event') {
      deleteEvent(uid)
    }
  }
}

const collect = (connect) => ({
  connectDropTarget: connect.dropTarget()
})

export default connect(null, { deletePerson, deleteEvent })(
  DropTarget(['person', 'event'], spec, collect)(Trash)
)
