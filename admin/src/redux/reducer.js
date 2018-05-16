import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import adminReducer, { moduleName as adminModule } from '../ducks/admin'
import formReducer, { moduleName as formModule } from '../ducks/form'

export default combineReducers({
	router,

	[authModule]: authReducer,
	[formModule]: formReducer,
	[adminModule]: adminReducer
})
