import {appName} from '../config'
import {Record, List} from 'immutable'
import { createSelector } from 'reselect'

/**
 * Constants
 * */
export const moduleName = 'admin'
const prefix = `${appName}/${moduleName}`

export const ADD_USER = `${prefix}/ADD_USER`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    users: new List()
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_USER:
            return state.setIn(['users'], state.users.push(payload.user))

        default:
            return state
    }
}

/**
 * Selectors
 * */
export const usersSelector = state => state[moduleName].users
/**
 * Action Creators
 * */

export function addUser(firstName, lastName, email) {
    return {
      type: ADD_USER,
      payload: {user: {firstName, lastName, email}}
    }
}