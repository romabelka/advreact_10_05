import {appName} from '../config'
import {List} from 'immutable'
import firebase from 'firebase/app'
import 'firebase/database'
import {reset} from 'redux-form';

/**
 * Constants
 * */
export const moduleName = 'users'
export const usersRef = firebase.database().ref(moduleName)
const prefix = `${appName}/${moduleName}`

export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`
export const SET_LIST_USERS = `${prefix}/SET_LIST_USERS`

/**
 * Reducer
 * */
export const ReducerList = List()

export default function reducer(state = ReducerList, action) {
    const {type, payload} = action

    switch (type) {
        case ADD_USER_SUCCESS:
            return state.unshift(payload.user)
        case SET_LIST_USERS:
            return List(payload.users)

        default:
            return state
    }
}

/**
 * Selectors
 * */
export const usersSelector = state => state.users

/**
 * Action Creators
 * */

export function addUser(user) {
    return (dispatch) => {
        let {firstName, lastName, email} = user;

        usersRef
            .push()
            .set({
                firstName: firstName,
                lastName: lastName,
                email: email,
            }).then(() => {
                dispatch({ type: ADD_USER_SUCCESS, payload: { user } })
                dispatch(reset('addUser'))
            })
    }
}

export function listUsers() {
    return (dispatch) => {
        usersRef.once('value', users => {
            dispatch({type: SET_LIST_USERS, payload: {users: Object.values(users.val())}})
        })
    }
}


