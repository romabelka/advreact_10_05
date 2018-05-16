import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from './components/common/protected-route'
import { AuthPage, AdminPage } from './routes'

class App extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path="/" exact component={AuthPage} />
					<Route path="/auth" component={AuthPage} />
					<ProtectedRoute path="/admin" component={AdminPage} />
				</Switch>
			</div>
		)
	}
}

export default App
