import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import ErrorField from '../../common/error-field'
import { formValidate as validate } from '../../../helpers/validate'

class AddUserForm extends Component {
	static propTypes = {}

	render() {
		const { admin, submitting, valid } = this.props
		const userList = admin.get('usersList')

		console.log('Users list: ', userList.toJS())
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
					<button type="submit" disabled={submitting || !valid}>
						Add
					</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	admin: state.admin
})

AddUserForm = connect(mapStateToProps)(AddUserForm)

export default reduxForm({
	form: 'addUser',
	validate
})(AddUserForm)
