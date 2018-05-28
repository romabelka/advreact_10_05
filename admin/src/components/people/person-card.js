import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

class PersonCard extends Component {
  static propTypes = {}

  render() {
    const { person, connectDragSource } = this.props
    return connectDragSource(
      <div style={{ height: 200 }}>
        <h2>{person.firstName}</h2>
        <h2>{person.lastName}</h2>
        <h3>{person.email}</h3>
      </div>
    )
  }
}

const spec = {
  beginDrag(props) {
    return {
      uid: props.person.uid
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource()
})

export default DragSource('person', spec, collect)(PersonCard)
