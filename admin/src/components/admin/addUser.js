import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from "../common/error-field";

class AddUser extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h2>Add user</h2>
                <form onSubmit = {this.props.handleSubmit}>
                    <Field name = "firstName" component = {ErrorField} label = "First name:" />
                    <Field name = "lastName" component = {ErrorField} label = "Last name:" />
                    <Field name = "email" component = {ErrorField} label = "Email:" />
                    <button type = "submit">add</button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'addUser'
})(AddUser)
