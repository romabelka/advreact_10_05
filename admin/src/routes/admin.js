import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink, Route } from 'react-router-dom'
import User from "../components/admin/add-user";
import { addUser } from '../ducks/auth'

class AdminPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <div>
                    <NavLink to = "/admin/user" activeStyle = {{ color: 'red' }}>Add user</NavLink>
                </div>
                <Route path = "/admin/user" render = {() => <User onSubmit = {this.addUser}/>}/>
            </div>
        )

    }

    addUser = ({ email, first, last }) => {
        console.log(email, first, last)
        this.props.addUser({email, first, last})
    }

}

export default connect(null, { addUser })(AdminPage)
