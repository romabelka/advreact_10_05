import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import ProtectedRoute from './components/common/protected-route'
import AuthPage from './routes/auth'
import AdminPage from './routes/admin'

const activeStyle = { color: 'red' }

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <NavLink to="/admin/events" activeStyle={activeStyle}>
            events
          </NavLink>
        </div>
        <div>
          <NavLink to="/admin/people" activeStyle={activeStyle}>
            people
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth/sign-in" activeStyle={activeStyle}>
            auth
          </NavLink>
        </div>

        <Route path="/auth" component={AuthPage} />
        <ProtectedRoute path="/admin" component={AdminPage} />
      </div>
    )
  }
}

export default App
