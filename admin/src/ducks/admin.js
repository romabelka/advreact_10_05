import {appName} from '../config'
import {Record, List} from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'admin'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON = `${prefix}/ADD_PERSON`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    people: List()
})

export default function reducer(state = new ReducerRecord(), action) {

    switch (action.type) {
        case ADD_PERSON:
            return state.set('people', peopleReducer(state.people, action))

        default:
            return state
    }
}

const peopleReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case ADD_PERSON:
            return state.push(payload.person)
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

export function addPerson(person) {
    return { type: ADD_PERSON, payload: { person } }
}