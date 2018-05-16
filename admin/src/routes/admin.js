import React, { Component } from 'react'
import {connect} from 'react-redux'
import AddUser from '../components/admin/addUser'
import ListUsers from '../components/admin/listUsers'
import { listUsers, addUser, usersSelector } from '../ducks/users'

class AdminPage extends Component {
    static propTypes = {

    }

    componentDidMount() {
        this.props.listUsers()
    }

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <AddUser onSubmit={this.addUser} />
                <ListUsers users={this.props.users} />
            </div>
        )
    }

    addUser = (user) => this.props.addUser(user)
}

export default connect(state => ({
    users: usersSelector(state)
}), {addUser, listUsers})(AdminPage);