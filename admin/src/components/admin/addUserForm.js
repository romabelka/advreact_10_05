import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import validator from 'email-validator'
import ErrorField from '../common/error-field'

class AddUserForm extends Component {
    static propTypes = {}

    render() {
        return (
            <div>
                <h2>Add user</h2>
                <form onSubmit={this.props.handleSubmit}>
                    <div>
                        Email:
                        <Field name="email" component={ErrorField}/>
                    </div>
                    <div>
                        First name:
                        <Field name="firstName" component="input" type="text"/>
                    </div>
                    <div>
                        Last name:
                        <Field name="lastName" component="input" type="text"/>
                    </div>
                    <button type="submit">add</button>
                </form>
            </div>
        )
    }
}

const validate = ({email}) => {
    const errors = {}

    if (!email) errors.email = 'email is a required field'
    if (email && !validator.validate(email)) errors.email = 'invalid email'
    return errors
}

export default reduxForm({
    form: 'addUser',
    validate
})(AddUserForm)
