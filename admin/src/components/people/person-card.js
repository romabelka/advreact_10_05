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
    const { person, style, connectDragSource } = this.props
    return (
      <div style={style}>
        {connectDragSource(
          <h1>
            {person.firstName} <b>{person.lastName}</b>
          </h1>
        )}
        <h3>{person.email}</h3>
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
