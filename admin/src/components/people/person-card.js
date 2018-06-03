import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import DragPreview from './person-drag-preview'

class PersonCard extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.connectPreview(getEmptyImage())
  }

  render() {
    const { person, connectDragSource } = this.props
    return (
      <div style={{ height: 150 }}>
        {connectDragSource(<h2>{person.firstName}</h2>)}
        <h3>{person.lastName}</h3>
        <h4>{person.email}</h4>
      </div>
    )
  }
}

const spec = {
  beginDrag(props) {
    return {
      uid: props.person.uid,
      DragPreview
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectPreview: connect.dragPreview()
})

export default DragSource('person', spec, collect)(PersonCard)
