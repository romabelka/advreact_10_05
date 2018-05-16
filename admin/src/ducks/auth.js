import {appName} from '../config'
import {Record} from 'immutable'
import firebase from 'firebase'
import { createSelector } from 'reselect'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const ADD_MEMBER_SUCCESS = `${prefix}/ADD_MEMBER_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    members: [],
    user: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_MEMBER_SUCCESS:
            const arr = state.get('members').slice(0);

            arr.push(payload);

            return state.set('members', arr)
        case SIGN_IN_SUCCESS:
        case SIGN_UP_SUCCESS:
            return state.set('user', payload.user)

        default:
            return state
    }
}

/**
 * Selectors
 * */
export const userSelector = state => state[moduleName].user
export const membersSelector = state => state[moduleName].members

export const membersList = createSelector(membersSelector, members => members)
export const authorizedSelector = createSelector(userSelector, user => !!user)

/**
 * Action Creators
 * */

export function signUp(email, password) {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => dispatch({ type: SIGN_UP_SUCCESS, payload: { user } }))
    }
}

export function signIn(email, password) {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => dispatch({ type: SIGN_IN_SUCCESS, payload: { user } }))
    }
}

export function addMembers(firstname, lastname, email) {
    return (dispatch) => {
        dispatch({ type: ADD_MEMBER_SUCCESS, payload: {firstname, lastname, email} })
    }
}

firebase.auth().onAuthStateChanged(user => {
    user && window.store.dispatch({
        type: SIGN_IN_SUCCESS,
        payload: { user }
    })
})