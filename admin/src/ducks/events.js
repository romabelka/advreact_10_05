import { appName } from '../config'
import { Record, Map } from 'immutable'
import { createSelector } from 'reselect'
import { takeEvery, all, put, apply } from 'redux-saga/effects'
import firebase from 'firebase/app'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const FETCH_EVENTS_REQUEST = `${prefix}/FETCH_EVENTS_REQUEST`
export const FETCH_EVENTS = `${prefix}/FETCH_EVENTS`

/**
 * Reducer
 * */
const ReducerState = Record({
  isFetched: false,
  isFetching: false,
  entities: new Map({})
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_EVENTS_REQUEST:
      return state.set('isFetched', false).set('isFetching', true)

    case FETCH_EVENTS:
      return state
        .update('entities', (entities) => new Map(payload))
        .set('isFetched', true)
        .set('isFetching', false)

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const eventsSelector = createSelector(stateSelector, (state) =>
  state.toJS()
)
export const eventsListSelector = createSelector(stateSelector, (state) =>
  state.entities.toJS()
)

/**
 * Action Creators
 * */

export function fetchEvents() {
  return {
    type: FETCH_EVENTS_REQUEST
  }
}

/**
 *  Sagas
 * */

export function* fetchEventsSaga() {
  const database = firebase.database().ref('/events')

  const snapshot = yield apply(database, database.once, ['value'])

  yield put({ type: FETCH_EVENTS, payload: snapshot.val() })
}

export function* saga() {
  yield all([takeEvery(FETCH_EVENTS_REQUEST, fetchEventsSaga)])
}
