import React, { Component } from 'react'

class PersonCard extends Component {
  static propTypes = {}

  render() {
    const { person } = this.props
    return (
      <div style={{ height: 200 }}>
        <h2>{person.firstName}</h2>
        <h2>{person.lastName}</h2>
        <h3>{person.email}</h3>
      </div>
    )
  }
}

export default PersonCard
