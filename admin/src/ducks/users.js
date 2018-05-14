import {appName} from '../config'

/**
 * Constants
 * */
export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`

/**
 * Reducer
 * */
export default function reducer(state = [], action) {
    const {type, payload} = action

    switch (type) {
        case ADD_USER_SUCCESS:
            return [...state, payload.user]

        default:
            return state
    }
}

/**
 * Selectors
 * */
export const usersSelector = state => state[moduleName]

/**
 * Action Creators
 * */

export function addUser(firstname, lastname, email) {
    return (dispatch) => {
        return Promise.resolve(dispatch({
            type: ADD_USER_SUCCESS,
            payload: { user: { firstname, lastname, email } }
        }))
    }
}