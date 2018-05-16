import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import validator from 'email-validator'
import ErrorField from '../common/error-field'

class AddPersonForm extends Component {
    render() {
        return (
            <div>
                <h2>Add person</h2>
                <form onSubmit={this.props.handleSubmit}>
                    <Field name="first" component={ErrorField} label="First name:"/>
                    <Field name="last" component={ErrorField} label="Last name:"/>
                    <Field name="email" component={ErrorField} label="Email:"/>
                    <button type="submit">Add person</button>
                </form>
            </div>
        )
    }
}

const validate = ({email, first, last}) => {
    const errors = {}

    if (!first) errors.first = 'firstname is a required field'

    if (!last) errors.last = 'lastname is a required field'

    if (!email) errors.email = 'email is a required field'
    if (email && !validator.validate(email)) errors.email = 'invalid email'

    return errors
}

export default reduxForm({
    form: 'addPerson',
    validate
})(AddPersonForm)