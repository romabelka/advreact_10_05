import React, { Component } from 'react'
import {connect} from 'react-redux'
import UserForm from './user-form'
import {addUser} from "../../ducks/users";


class Users extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                <UserForm onSubmit = {this.addUser} />
            </div>
        )
    }

    addUser = ({ name, surname, email }) => this.props.addUser(name, surname, email)
}

export default connect(null, { addUser })(Users)
