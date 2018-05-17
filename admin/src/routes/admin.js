import React, { Component } from 'react'
import {NavLink, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import AddUserForm from '../components/admin/add-user'
import { addUser } from '../ducks/admin'

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

    addUser = ({ email, first, last }) => this.props.addUser(email, first, last)

}

export default connect(null, { addUser })(AdminPage)