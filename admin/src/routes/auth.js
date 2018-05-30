import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInForm from '../components/auth/sign-in'
import SignUpForm from '../components/auth/sign-up'
import { signUp, signIn } from '../ducks/auth'

class AuthPage extends Component {
  render() {
    return (
      <div>
        <h1>Please sign in</h1>
        <div>
          <NavLink to="/auth/sign-in" activeStyle={{ color: 'red' }}>
            Sign In
          </NavLink>
          <NavLink to="/auth/sign-up" activeStyle={{ color: 'red' }}>
            Sign Up
          </NavLink>
        </div>
        <Route
          path="/auth/sign-in"
          render={() => <SignInForm onSubmit={this.signIn} />}
        />
        <Route
          path="/auth/sign-up"
          render={() => <SignUpForm onSubmit={this.signUp} />}
        />
      </div>
    )
  }

  signUp = ({ email, password }) => this.props.signUp(email, password)
  signIn = ({ email, password }) => this.props.signIn(email, password)
}

export default connect(null, { signUp, signIn })(AuthPage)
