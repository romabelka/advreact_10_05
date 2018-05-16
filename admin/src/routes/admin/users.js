import React, { Component } from 'react'
import {connect} from 'react-redux'
import AddUserForm from '../../components/users/add-user'
import { addUser } from '../../ducks/users'

class AdminUsersPage extends Component {
    render() {
        return (
            <div>
                <AddUserForm onSubmit = {this.addUser}/>
            </div>
        )
    }

    addUser = ({ firstName, lastName, email }) => this.props.addUser(firstName, lastName, email)
}

export default connect(null, { addUser })(AdminUsersPage)
