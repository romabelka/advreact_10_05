import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import validator from 'email-validator'
import ErrorField from '../common/error-field'

class AddUserForm extends Component {
    render() {
        return (
            <div>
                <h2>Add User</h2>
                <form onSubmit = {this.handleSubmit}>
                    <Field name = "firstname" component = {ErrorField} label = "First Name:" />
                    <Field name = "lastname" component = {ErrorField} label = "Last Name:" />
                    <Field name = "email" component = {ErrorField} label = "Email:" />
                    <button type = "submit">Add User</button>
                </form>
            </div>
        )
    }

    handleSubmit = data => this.props.handleSubmit(data).then(this.props.reset);
}

const validate = ({ firstname, lastname, email }) => {
    const errors = {}

    if (!firstname) errors.firstname = 'first name is a required field'
    if (!lastname) errors.lastname = 'last name is a required field'
    if (!email) errors.email = 'email is a required field'
    if (email && !validator.validate(email)) errors.email = 'invalid email'

    return errors
}

export default reduxForm({
    form: 'user',
    validate
})(AddUserForm)