import React, { Component } from 'react'
import { connect } from 'react-redux'
import { usersSelector } from '../../ducks/admin'

class UserList extends Component {
  render() {
    if (!this.props.users || !this.props.users.length) return 'No users added yet'

    return (
      <div>
        <h3>Added users</h3>
        <ul>
          {this.props.users.map(user => <li key={user.email}>{`${user.firstName} ${user.lastName} <${user.email}>`}</li>)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  users: usersSelector(state).toArray()
})

export default connect(mapStateToProps, null)(UserList)
