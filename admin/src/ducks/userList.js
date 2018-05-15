import {appName} from '../config'
import {createSelector} from 'reselect'
import {List} from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'user_list'
const prefix = `${appName}/${moduleName}`

export const ADD_USER = `${prefix}/ADD_USER`

export default function reducer(state = new List, action) {
    const {type, payload} = action
    switch (type) {
        case ADD_USER: {
            return state.push(payload)
        }
        default:
            return state
    }
}

/**
 * Action Creators
 * */
export function addUser(email, firstName, lastName) {
    return {
        type: ADD_USER, payload: {
            user: {email, firstName, lastName}
        }

    }
}