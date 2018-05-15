import React, { Component } from 'react'
import UserForm from '../components/admin/user-form'


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

    addUser = ({firstName, lastName, email}) => console.log(firstName, lastName, email)
}

export default AdminPage