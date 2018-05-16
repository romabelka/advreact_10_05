import React, { Component } from 'react'

class listUsers extends Component {
    static propTypes = {

    }

    render() {
        let users = this.props.users.toArray().map(user => (
            <tr key={user.email} >
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
            </tr>
        ))

        return (
            <div>
                <h2>Users</h2>
                <table>
                    <thead>
                        <tr>
                            <td>First name</td>
                            <td>Last name</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default listUsers