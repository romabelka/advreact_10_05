import React, { Component } from 'react'
import Users from '../components/admin/users'
import {NavLink, Route} from 'react-router-dom'

class AdminPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <div>
                    <NavLink to = "/admin/users" activeStyle = {{ color: 'red' }}>Users</NavLink>
                </div>
                <Route path = "/admin/users" render = {() => <Users />} />
            </div>
        )
    }
}

export default AdminPage