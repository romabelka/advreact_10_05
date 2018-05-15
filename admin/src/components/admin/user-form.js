import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';

class UserForm extends Component {
  render() {
    return (
      <div>
        <h2>New user form</h2>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <label>First name</label>
            <Field name="firstName" component="input" type="text" placeholder="First name" />
          </div>
          <div>
            <label>Last name</label>
            <Field name="lastName" component="input" type="text" placeholder="Last name" />
          </div>
          <div>
            <label>Email</label>
            <Field name="email" component="input" type="email" placeholder="Email" />
          </div>

          <button type="submit">Add user</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'userForm'
})(UserForm)