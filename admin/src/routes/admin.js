import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import AddPersonForm from '../components/admin/add-person'
import { connect } from 'react-redux'
import { addPerson } from '../ducks/admin'

class AdminPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <div>
                    <NavLink to = "/admin/add-person" activeStyle = {{ color: 'red' }}>Add person form</NavLink>
                </div>
                <Route path = "/admin/add-person" render = {() => <AddPersonForm onSubmit = {this.props.addPerson}/>}/>
            </div>
        )
    }
}

export default connect(null, { addPerson })(AdminPage)