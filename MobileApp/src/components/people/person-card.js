import React, { Component } from 'react'
import { Text } from 'react-native'
import Card from '../common/card'

class PeopleCard extends Component {
  render() {
    const {
      person: { firstName, lastName }
    } = this.props
    return (
      <Card>
        <Text>
          {firstName} {lastName}
        </Text>
      </Card>
    )
  }
}

export default PeopleCard
