import React, { Component } from 'react'
import { connect } from 'react-redux'
import { peopleSelector } from '../../ducks/people'
import { List } from 'react-virtualized'
import PersonCard from './person-card'

class PeopleList extends Component {
  static propTypes = {}

  render() {
    return (
      <List
        width={500}
        height={200}
        rowCount={this.props.people.length}
        rowHeight={200}
        rowRenderer={this.rowRenderer}
      />
    )
  }

  rowRenderer = ({ index }) => <PersonCard person={this.props.people[index]} />
}

export default connect((state) => ({
  people: peopleSelector(state)
}))(PeopleList)
