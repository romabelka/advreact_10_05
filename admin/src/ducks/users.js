import {appName} from '../config'
import {List, Map} from 'immutable'
import uuidv1 from 'uuid/v1'

/**
 * Constants
 * */
export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const ADD_USER = `${prefix}/ADD_USER`

/**
 * Reducer
 * */
export const initialState = List([])

export default function reducer(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case ADD_USER:
            return state.push(Map(payload.user))

        default:
            return state
    }
}

/**
 * Selectors
 * */


/**
 * Action Creators
 * */
export function addUser(firstName, lastName, email) {
    const id = uuidv1();

    return {
        type: ADD_USER,
        payload: {
            user: { id, firstName, lastName, email }
        }
    }
}
