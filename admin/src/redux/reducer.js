import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import userReducer, { moduleName as userModule } from '../ducks/users'

export default combineReducers({
    router, form,
    [authModule]: authReducer,
    [userModule]: userReducer
})