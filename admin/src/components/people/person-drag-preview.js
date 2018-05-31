import React, { Component } from 'react'
import { connect } from 'react-redux'
import { personSelector } from '../../ducks/people'

class PersonDragPreview extends Component {
  static propTypes = {}

  render() {
    return <h1>{this.props.person.email}</h1>
  }
}

export default connect((state, props) => ({
  person: personSelector(state, props)
}))(PersonDragPreview)
