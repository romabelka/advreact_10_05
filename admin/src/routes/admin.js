import React, { Component } from 'react'
import {NavLink, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import AddUserForm from '../components/users/add'
import { addUser } from '../ducks/users'

class AdminPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <div>
                    <NavLink to = "/admin/add-user" activeStyle = {{ color: 'red' }}>Add User</NavLink>
                </div>
                <Route path = "/admin/add-user" render = {() => <AddUserForm onSubmit = {this.addUser}/>}/>
            </div>
        )
    }

    addUser = ({ firstname, lastname, email }) => this.props.addUser(firstname, lastname, email)
}

export default connect(null, { addUser })(AdminPage)