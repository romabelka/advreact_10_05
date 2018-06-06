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
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {(interpolated) => (
          <List
            rowRenderer={(data) =>
              this.rowRenderer(data, interpolated[data.index])
            }
            rowCount={this.props.people.length}
            rowHeight={150}
            height={400}
            width={400}
          />
        )}
      </TransitionMotion>
    )
  }

  rowRenderer = ({ style, index, key }, interpolated) => {
    if (!interpolated) return null
    const person = interpolated.data
    return (
      <div style={{ ...style, ...interpolated.style }} key={key}>
        <PersonCard person={person} />
      </div>
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
