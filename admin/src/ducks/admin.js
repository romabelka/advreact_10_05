import {appName} from '../config'
import {Record} from 'immutable'
import {createSelector} from "reselect";

/**
 * Constants
 * */
export const moduleName = 'admin'
const prefix = `${appName}/${moduleName}`

export const ADD_MEMBER_SUCCESS = `${prefix}/ADD_MEMBER_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    members: []
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_MEMBER_SUCCESS:
            const arr = state.get('members').slice(0);

            arr.push(payload);
            return state.set('members', arr)


        default:
            return state
    }
}

/**
 * Selectors
 * */
export const membersSelector = state => state[moduleName].members
export const membersList = createSelector(membersSelector, members => members)

/**
 * Action Creators
 * */
export function addMembers(firstname, lastname, email) {
    return (dispatch) => {
        dispatch({ type: ADD_MEMBER_SUCCESS, payload: {firstname, lastname, email} })
    }
}
