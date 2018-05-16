import React, {Component} from 'react'
import { Route } from 'react-router-dom'
// import ProtectedRoute from './components/common/protected-route'
import AuthPage from './routes/auth'
import AdminPage from './routes/admin'

class App extends Component {
    render() {
        return (
            <div>
                <Route path = "/auth" component = {AuthPage} />
                {/*<ProtectedRoute path = "/admin" component = {AdminPage} />*/}
                <Route path = "/admin" component = {AdminPage} />
            </div>
        )
    }

}

export default App;
