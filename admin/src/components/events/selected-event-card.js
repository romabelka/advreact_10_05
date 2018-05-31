import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addEventToPerson, peopleSelector } from '../../ducks/people'

class SelectedEventCard extends Component {
  static propTypes = {}

  render() {
    const { event, people, connectDropTarget, canReceive, hovered } = this.props
    const peopleList = people.map((person) => person.email).join(', ')
    const borderColor = canReceive ? (hovered ? 'green' : 'red') : 'black'

    return connectDropTarget(
      <div style={{ border: `1px solid ${borderColor}` }}>
        <h3>{event.title}</h3>
        <h4>{event.where}</h4>
        <p>{peopleList}</p>
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

export default connect(
  (state, props) => {
    return {
      people: peopleSelector(state).filter((person) =>
        person.events.includes(props.event.uid)
      )
    }
  },
  { addEventToPerson }
)(DropTarget(['person'], spec, collect)(SelectedEventCard))
