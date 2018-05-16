import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import ErrorField from '../common/error-field'
import { formValidate as validate } from '../../helpers/validate'

class SignUpForm extends Component {
	static propTypes = {}

	render() {
		return (
			<div>
				<h2>Sign Up</h2>
				<form onSubmit={this.props.handleSubmit}>
					<Field name="email" component={ErrorField} label="Email:" />
					<Field name="password" component={ErrorField} label="Password:" type="password" />
					<button type="submit">Sign Up</button>
				</form>
			</div>
		)
	}
}

export default reduxForm({
	form: 'auth',
	validate
})(SignUpForm)
