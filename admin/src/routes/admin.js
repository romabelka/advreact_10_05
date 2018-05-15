import React, { Component } from 'react'
import UserForm from '../components/admin/user-form'
import { connect } from 'react-redux'
import {addUser} from '../ducks/admin'


class AdminPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <UserForm onSubmit={this.addUser}/>
            </div>
        )
    }

    addUser = ({firstName, lastName, email}) => this.props.addUser(firstName, lastName, email)
}

export default connect(null, {addUser})(AdminPage)