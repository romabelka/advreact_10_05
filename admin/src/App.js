import React, {Component} from 'react'
import {NavLink, Route} from 'react-router-dom'
import ProtectedRoute from './components/common/protected-route'
import AuthPage from './routes/auth'
import AdminPage from './routes/admin'

class App extends Component {
    render() {
        return (
            <div>
                <NavLink to = "/auth" activeStyle = {{ color: 'red' }}>Auth</NavLink>&nbsp;
                <NavLink to = "/admin" activeStyle = {{ color: 'red' }}>Admin</NavLink>&nbsp;

                <Route path = "/auth" component = {AuthPage} />
                <ProtectedRoute path = "/admin" component = {AdminPage} />
            </div>
        )
    }
}

export default App;
