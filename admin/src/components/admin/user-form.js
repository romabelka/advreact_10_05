import React, { Component } from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import validator from 'email-validator'
import ErrorField from '../common/error-field'

const UserForm = ({handleSubmit}) => {
    return (
      <div>
        <h2>New user form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First name</label>
            <Field name="firstName" component={ErrorField} type="text" placeholder="First name" />
          </div>
          <div>
            <label>Last name</label>
            <Field name="lastName" component={ErrorField} type="text" placeholder="Last name" />
          </div>
          <div>
            <label>Email</label>
            <Field name="email" component={ErrorField} type="email" placeholder="Email" />
          </div>

          <button type="submit">Add user</button>
        </form>
      </div>
    )
}

const validate = ({ firstName, lastName, email }) => {
  const errors = {}

  if (!firstName) errors.firstName = 'First name is a required field'
  if (firstName && firstName.length < 4) errors.firstName = 'too short'

  if (!lastName) errors.lastName = 'Last name is a required field'
  if (lastName && lastName.length < 4) errors.lastName = 'too short'

  if (!email) errors.email = 'email is a required field'
  if (email && !validator.validate(email)) errors.email = 'invalid email'

  return errors
}

const form = 'userForm'
const onSubmitSuccess = (result, dispatch) => dispatch(reset(form));

export default reduxForm({
  form,
  onSubmitSuccess,
  validate
})(UserForm)