import React, { Component } from 'react'
import PersonAvatar from '../people/person-avatar'

class PersonAvatarScreen extends Component {
  render() {
    return <PersonAvatar uid={this.props.navigation.state.params.uid} />
  }
}

export default PersonAvatarScreen
