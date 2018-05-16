import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import validator from 'email-validator'
import ErrorField from '../common/error-field'

class User extends Component {
    // static propTypes = {}

    render() {
        return (
            <div>
                <h2>Add user</h2>
                <form onSubmit={this.props.handleSubmit}>
                    <div>
                        First name:
                        <Field name="first" component="input" />
                    </div>
                    <div>
                        Last name:
                        <Field name="last" component="input" />
                    </div>
                    <div>
                        <Field name="email" component={ErrorField} label="Email:"/>
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}

const validate = ({email, password}) => {
    const errors = {}

    if (!email) errors.email = 'email is a required field'
    if (email && !validator.validate(email)) errors.email = 'invalid email'


    return errors
}

export default reduxForm({
    form: 'user',
    validate
})(User)
