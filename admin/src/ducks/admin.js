import { appName } from '../config'
import { Record, List } from 'immutable'

export const moduleName = 'admin'
const prefix = `${appName}/${moduleName}`

export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`

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

export function addUser(userData) {
	return { type: ADD_USER_SUCCESS, payload: { user: userData } }
}
