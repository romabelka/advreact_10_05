import React, { Component } from 'react'
import {Link, Route, withRouter} from 'react-router-dom'
import AdminUsersPage from './users'
import { connect } from 'react-redux';

class AdminPage extends Component {
    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <div>
                    <Link to = "/admin/users">Users</Link>
                </div>

                <Route path = "/admin/users" render = {() => <AdminUsersPage/>}/>
            </div>
        )
    }
}

export default connect()(AdminPage)
