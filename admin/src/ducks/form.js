import { reducer as form } from 'redux-form'

import { ADD_USER_SUCCESS } from './admin'

export const moduleName = 'form'

export default form.plugin({
	addUser: (state, action) => {
		switch (action.type) {
			case ADD_USER_SUCCESS:
				return undefined
			default:
				return state
		}
	}
})
