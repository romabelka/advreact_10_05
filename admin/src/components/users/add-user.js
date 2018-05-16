import React, { Component } from 'react'
import { Field, reduxForm, reset } from 'redux-form'
import validator from 'email-validator'
import ErrorField from '../common/error-field'

class AddUserForm extends Component {
    render() {
        return (
            <div>
                <h2>AddUser</h2>
                <form onSubmit = {this.props.handleSubmit}>
                    <Field name = "firstName" component = {ErrorField} label = "First Name:" />
                    <Field name = "lastName" component = {ErrorField} label = "Last Name:" />
                    <Field name = "email" component = {ErrorField} label = "Email:" />
                    <button type = "submit">Add User</button>
                </form>
            </div>
        )
    }
}

const validate = ({ firstName, lastName, email }) => {
    const errors = {}

    if (!firstName) errors.firstName = 'first name is a required field'
    if (!lastName) errors.lastname = 'last name is a required field'
    if (email && !validator.validate(email)) errors.email = 'invalid email'

    return errors
}

export default reduxForm({
    form: 'add-user',
    onSubmitSuccess: (result, dispatch) => dispatch(reset('add-user')),
    validate
})(AddUserForm)