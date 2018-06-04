import React, { Component } from 'react'
import { connect } from 'react-redux'
import { peopleSelector, fetchAllPeople } from '../../ducks/people'
import { List } from 'react-virtualized'
import { TransitionMotion, spring } from 'react-motion'
import PersonCard from './person-card'

import 'react-virtualized/styles.css'

class PeopleList extends Component {
  componentDidMount() {
    this.props.fetchAllPeople()
  }

  render() {
    return (
      <TransitionMotion styles={this.getStyles()} willEnter={this.willEnter}>
        {(interpolated) => (
          <List
            rowRenderer={this.rowRenderer(interpolated)}
            rowCount={this.props.people.length}
            rowHeight={150}
            height={400}
            width={400}
          />
        )}
      </TransitionMotion>
    )
  }

  rowRenderer = (interpolated) => ({ style, index, key }) => {
    const person = interpolated[index]

    if (person)
      return (
        <div style={{ ...style, ...person.style }} key={key}>
          <PersonCard person={person.data} />
        </div>
      )
  }

  willEnter = () => ({
    opacity: 0
  })

  getStyles = () =>
    this.props.people.map((person) => ({
      key: person.uid,
      style: {
        opacity: spring(1, { stiffness: 10, dumping: 30 })
      },
      data: person
    }))
}

export default connect(
  (state) => ({
    people: peopleSelector(state)
  }),
  { fetchAllPeople }
)(PeopleList)
