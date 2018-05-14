import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import AuthPage from './routes/auth'

class App extends Component {
    render() {
        return (
            <div>
                <Route path = "/auth" component = {AuthPage} />
            </div>
        )
    }
}

export default App;
