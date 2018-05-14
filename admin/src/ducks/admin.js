import { appName } from '../config'
import { Record, List } from 'immutable'
// import firebase from 'firebase'
// import { createSelector } from 'reselect'

/**
 * Constants
 * */
export const moduleName = 'admin'
const prefix = `${appName}/${moduleName}`

export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
	usersList: List()
})

export default function reducer(state = new ReducerRecord(), action) {
	const { type, payload } = action

	switch (type) {
		case ADD_USER_SUCCESS:
			return state.update('usersList', arr => arr.push(payload.user))

		default:
			return state
	}
}

/**
 * Action Creators
 * */

export function addUser(userData) {
	return dispatch => dispatch({ type: ADD_USER_SUCCESS, payload: { user: userData } })
}

// firebase.auth().onAuthStateChanged(user => {
// 	user &&
// 		window.store.dispatch({
// 			type: SIGN_IN_SUCCESS,
// 			payload: { user }
// 		})
// })
