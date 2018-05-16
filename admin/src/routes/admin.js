import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import AddUserForm from '../components/admin/users/add-user'
import { addUser } from '../ducks/admin'

class AdminPage extends Component {
	render() {
		return (
			<div>
				<h1>Admin Page</h1>
				<div>
					<NavLink exact to="/admin" activeStyle={{ color: 'red' }}>
						Main
					</NavLink>

					<NavLink exact to="/admin/add-user" activeStyle={{ color: 'red' }}>
						Add user
					</NavLink>
				</div>
				<Route path="/admin/add-user" render={() => <AddUserForm onSubmit={this.addUser} />} />
			</div>
		)
	}

	addUser = userData => this.props.addUser(userData)
}

export default connect(null, { addUser })(AdminPage)
