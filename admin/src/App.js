import React, {Component} from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import ProtectedRoute from './components/common/protected-route'
import AuthPage from './routes/auth'
import AdminPage from './routes/admin'

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path = "/auth" component = {AuthPage} />
                    <ProtectedRoute path = "/admin" component = {AdminPage} />
                    <Redirect from = '/' exact to = '/auth' />
                </Switch>
            </div>
        )
    }
}

export default App;
