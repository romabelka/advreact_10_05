import React, { Component } from 'react'
import {connect} from 'react-redux'
import UserForm from '../components/user/user'
import { addUser } from '../ducks/user'

class AdminPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <UserForm onSubmit = {this.addUser}/>
            </div>
        )
    }

    addUser = ({ first, last, email }) => this.props.addUser(first, last, email)
}

export default connect(null, { addUser })(AdminPage)