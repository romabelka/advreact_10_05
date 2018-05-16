import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import adminReducer, { moduleName as adminModule, ADD_PERSON } from '../ducks/admin'

export default combineReducers({
    router,
    form: form.plugin({
        addPerson: (state, action) => {
            switch(action.type) {
                case ADD_PERSON:
                    return undefined
                default:
                    return state
            }
        }
    }),
    [authModule]: authReducer,
    [adminModule]: adminReducer,
})