import {appName} from '../config-kirsanov'
import {Record, OrderedMap} from 'immutable'
import {reset} from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'user'
const prefix = `${appName}/${moduleName}`

export const ADD_USER = `${prefix}/ADD_USER`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    users: new OrderedMap({})
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload, id} = action

    switch (type) {
        case ADD_USER:
            return state.setIn(['users', id], payload)

        default:
            return state
    }
}

/**
 * Selectors
 * */


/**
 * Middleware
 */
export const usersMiddleware = store => next => action => {
    if (action.type === ADD_USER) {
        action.id = Date.now()

        store.dispatch(reset('user'))
    }
    return next(action)
}


/**
 * Action Creators
 * */

export function addUser(name, surname, email) {
    return {
        type: ADD_USER,
        payload: {name, surname, email}
    }
}
