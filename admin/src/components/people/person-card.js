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
      <div style={{ height: 200 }}>
        {connectDragSource(<h2>{person.firstName}</h2>)}
        <h2>{person.lastName}</h2>
        <h3>{person.email}</h3>
      </div>
    )
  }
}

const spec = {
  beginDrag(props) {
    return {
      uid: props.person.uid,
      type: 'people',
      DragPreview
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectPreview: connect.dragPreview()
})

export default DragSource('person', spec, collect)(PersonCard)
