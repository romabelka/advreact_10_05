import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import SignIn from '../sign-in'

class AuthScreen extends Component {
  static propTypes = {}

  render() {
    return <SignIn onSignIn={this.handleSignIn} />
  }

  handleSignIn = () => {
    this.props.navigation.navigate('eventList')
  }
}

const styles = StyleSheet.create({})

export default AuthScreen
