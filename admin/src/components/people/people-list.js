import React, { Component } from 'react'
import { connect } from 'react-redux'
import { peopleSelector, fetchAllPeople } from '../../ducks/people'
import { List } from 'react-virtualized'
import PersonCard from './person-card'
import { TransitionMotion, spring } from 'react-motion'

import 'react-virtualized/styles.css'

class PeopleList extends Component {
  componentDidMount() {
    this.props.fetchAllPeople()
  }

  render() {
    return (
      <List
        rowRenderer={this.rowRenderer}
        rowCount={this.props.people.length}
        rowHeight={150}
        height={400}
        width={400}
      />
    )
  }

  rowRenderer = ({ style, index, key }) => {
    const person = this.props.people[index]
    return (
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {(interpolated) => (
          <div>
            {interpolated.map((item) => (
              <div style={item.style} key={item.key}>
                <PersonCard person={person} />
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    )
  }

  willEnter = () => ({
    opacity: 0
  })

  willLeave = () => ({
    opacity: spring(0, { stiffness: 15, dumping: 40 })
  })

  getStyles() {
    return this.props.people.map((person) => ({
      key: person.uid,
      style: {
        opacity: spring(1, { stiffness: 10, dumping: 30 })
      },
      data: person
    }))
  }
}

export default connect(
  (state) => ({
    people: peopleSelector(state)
  }),
  { fetchAllPeople }
)(PeopleList)
