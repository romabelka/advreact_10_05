import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import validator from 'email-validator'
import ErrorField from '../../common/error-field'

class AddUserForm extends Component {
	static propTypes = {}

	render() {
		const { admin } = this.props
		const userList = admin.get('usersList')
		console.log(userList.toJS())
		return (
			<div>
				<h2>Add user</h2>
				<form onSubmit={this.props.handleSubmit}>
					<Field name="firstName" component={ErrorField} label="First name:" />
					<Field name="lastName" component={ErrorField} label="Last name:" />
					<Field name="email" component={ErrorField} label="Email:" />
					<Field
						name="password"
						autoComplete={false}
						component={ErrorField}
						label="Password:"
						type="password"
					/>
					<button type="submit">Add</button>
				</form>
			</div>
		)
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

const mapStateToProps = state => ({
	admin: state.admin
})

AddUserForm = connect(mapStateToProps)(AddUserForm)

export default reduxForm({
	form: 'addUser',
	validate
})(AddUserForm)
