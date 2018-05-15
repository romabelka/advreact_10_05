import React, {Component} from 'react'
import AddUserForm from '../components/admin/addUserForm'
import {connect} from "react-redux"
import {addUser} from '../ducks/userList'

class AdminPage extends Component {
    static propTypes = {}

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <AddUserForm onSubmit = {this.addUser}/>
            </div>
        )
    }

    addUser = ({email, firstName, lastName}) => this.props.addUser(email, firstName, lastName)
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: (email, firstName, lastName) => dispatch(addUser(email, firstName, lastName))
    }

}

export default connect(null, mapDispatchToProps)(AdminPage)