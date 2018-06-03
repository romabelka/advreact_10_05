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
            rowCount={interpolated.length}
            rowHeight={150}
            height={400}
            width={400}
          />
        )}
      </TransitionMotion>
    )
  }

  rowRenderer = (interpolated) => ({ style, index, key }) => {
    const item = interpolated[index]

    return (
      <div style={{ ...style, ...item.style }} key={key}>
        <PersonCard person={item.data} />
      </div>
    )
  }

  willEnter = () => ({
    opacity: 0
  })

  getStyles = () => {
    return this.props.people.map((person) => ({
      key: person.uid,
      style: {
        opacity: spring(1, { stiffness: 20, dumping: 30 })
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
