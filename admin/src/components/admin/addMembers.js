import React, {Component} from 'react';
import { reduxForm, reset, Field } from 'redux-form'
import validator from 'email-validator'
import ErrorField from '../common/error-field'

class AddMembers extends Component {
    render() {
        return (
            <div>
                <h1>Add members</h1>
                <form onSubmit = {this.props.handleSubmit}>
                    <div>
                        <Field name = "firstName" label='First name: ' component = {ErrorField} />
                    </div>
                    <div>
                        <Field name = "lastName" label='Last name: ' component = {ErrorField} />
                    </div>
                    <div>
                        <Field name = "email" label='E-mail: ' component = {ErrorField} />
                    </div>
                    <button type = "submit">Add member</button>
                </form>
            </div>
        );
    }
}

const validate = ({ email, password }) => {
    const errors = {}

    if (!email) errors.email = 'email is a required field'
    if (email && !validator.validate(email)) errors.email = 'invalid email'

    if (!password) errors.password = 'password is a required field'
    if (password && password.length < 8) errors.password = 'to short'

    return errors
}

const afterSumbit = (result, dispatch) => {
    dispatch(reset('auth'));
}

export default reduxForm({
    form: 'auth',
    onSubmitSuccess: afterSumbit,
    validate
})(AddMembers);
