import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class SignInForm extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Sign In</h2>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            Email:
            <Field name="email" component="input" />
          </div>
          <div>
            Password:
            <Field name="password" component="input" type="password" />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'auth'
})(SignInForm)
