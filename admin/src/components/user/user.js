import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import validator from 'email-validator'
import ErrorField from "../common/error-field";

class UserForm extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h2>Add user</h2>
                <form onSubmit = {this.props.handleSubmit}>
                    <Field name = "first" component = {ErrorField} label = "First:" />
                    <Field name = "last" component = {ErrorField} label = "Last:" />
                    <Field name = "email" component = {ErrorField} label = "Email:" />
                    <button type = "submit">Add user</button>
                </form>
            </div>
        )
    }
}

const validate = ({ first, last, email }) => {
    const errors = {}

    if (!first || !last) errors.first = errors.last = 'first or last is a required field'
    if (email && !validator.validate(email)) errors.email = 'invalid email'

    return errors
}

export default reduxForm({
    form: 'user',
    validate
})(UserForm)
