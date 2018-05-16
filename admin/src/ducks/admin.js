import {appName} from '../config'
import {Record} from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'admin'
const prefix = `${appName}/${moduleName}`

export const ADD_MEMBER_SUCCESS = `${prefix}/ADD_MEMBER_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord2 = Record({
    members: null
})

export default function reducer(state = new ReducerRecord2(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_MEMBER_SUCCESS:
            return state.set('members', payload.members)

        default:
            return state
    }
}

/**
 * Selectors
 * */
/*
export const membersReturn = createSelector(membersSelector, members => members)*/

/**
 * Action Creators
 * */


