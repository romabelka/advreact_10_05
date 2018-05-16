import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import validator from 'email-validator'
import ErrorField from '../common/error-field'

class UserForm extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h3>Add an user here:</h3>
                <form onSubmit = {this.props.handleSubmit}>
                    <Field name = "name" component = {ErrorField} label = "First Name:" />
                    <Field name = "surname" component = {ErrorField} label = "Last Name:" />
                    <Field name = "email" component = {ErrorField} label = "Email:" />
                    <button type = "submit">Add</button>
                </form>
            </div>
        )
    }
}

const validate = ({ email, name, surname }) => {
    const errors = {}

    if (!email) errors.email = 'email is a required field'
    if (email && !validator.validate(email)) errors.email = 'invalid email'

    if (!name) errors.name = 'First Name is a required field'

    if (!surname) errors.surname = 'Last Name is a required field'

    return errors
}

export default reduxForm({
    form: 'user',
    validate
})(UserForm)