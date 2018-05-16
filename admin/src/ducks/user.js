import {List} from 'immutable'
import {reset} from 'redux-form'

import {appName} from '../config'

/**
 * Constants
 * */
export const moduleName = 'user'
const prefix = `${appName}/${moduleName}`

export const USER_ADD_SUCCESS = `${prefix}/USER_ADD_SUCCESS`

/**
 * Reducer
 * */
export const reducerRecord = List()

export default function reducer(state = reducerRecord, action) {
    const { type, payload } = action

    switch (type) {
        case USER_ADD_SUCCESS:{
            const { first, last, email } = payload
            return state.push({ first, last, email })
        }

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

export function addUser(first, last, email) {
    return (dispatch) => {
        dispatch({ type: USER_ADD_SUCCESS, payload: { first, last, email } })
        dispatch(reset('user'))
    }
}