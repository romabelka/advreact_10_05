import React, { Component } from 'react'
import {NavLink, Route} from 'react-router-dom'
import {connect} from 'react-redux'

import {addMembers, membersList} from '../ducks/admin'

import AddMembers from '../components/admin/addMembers'
import MemberList from '../components/admin/memberList'

class AdminPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <div>
                    <NavLink to="/admin/add-member" activeStyle = {{ color: 'red' }}>Add member</NavLink>
                </div>
                <div>
                    <Route path="/admin/add-member" render = {() => <AddMembers onSubmit = {this.addMembers}/>} />
                </div>
                <AddMembers onSubmit = {this.addMembers}/>
                <MemberList />
            </div>

        )
    }

    addMembers = ({ firstName, lastName, email }) => {
        this.props.addMembers(firstName, lastName, email)
    }

}

export default connect(state => ({membersList: membersList(state)}), {addMembers})(AdminPage)