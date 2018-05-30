import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { deleteItemByType } from '../../ducks/cart'

class Cart extends Component {
  static propTypes = {}

  render() {
    const { event, connectDropTarget, canReceive, hovered } = this.props
    const borderColor = canReceive ? (hovered ? 'green' : 'red') : 'black'
    return connectDropTarget(
      <div style={{ border: `1px solid ${borderColor}` }}>
        <h1>🛒</h1>
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const { deleteItemByType } = props
    deleteItemByType(monitor.getItem().uid)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canReceive: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default connect(null, { deleteItemByType })(
  DropTarget(['person', 'event'], spec, collect)(Cart)
)
