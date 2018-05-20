import { appName} from "../config"
import { Record, Map } from 'immutable'
import firebase from 'firebase/app'
import { takeEvery, all, put, call, apply } from 'redux-saga/effects'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const EVENTS_LOAD_REQUEST = `${prefix}/EVENTS_LOAD_REQUEST`
export const EVENTS_LOAD_SUCCESS = `${prefix}/EVENTS_LOAD_SUCCESS`
export const EVENTS_LOAD_ERROR = `${prefix}/EVENTS_LOAD_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    events: null,
    eventsLoadError: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch (type) {
        case EVENTS_LOAD_SUCCESS:
            return state.set('events', payload.events)
        case EVENTS_LOAD_ERROR:
            return state.set('eventsLoadError', payload.error)
        default:
            return state
    }
}

/**
 * Selectors
 */
export const getEvents = (state) => state[moduleName].events
export const getEventsLoadError = (state) => state[moduleName].eventsLoadError

/**
 * Action Creators
 * */

export function loadEvents() {
    return {
        type: EVENTS_LOAD_REQUEST
    }
}

/**
 *  Sagas
 */

export function* loadEventsSaga() {

    try {
        const refs = firebase.database().ref().child('events')
        const events = yield apply(refs, refs.once, ['value'])

        yield put({ type: EVENTS_LOAD_SUCCESS, payload: { events: Map(events.toJSON()) } })

    } catch (error) {
        yield put({ type: EVENTS_LOAD_ERROR, error })
    }
}

export function* saga() {
    yield all([takeEvery(EVENTS_LOAD_REQUEST, loadEventsSaga), loadEventsSaga()])
}