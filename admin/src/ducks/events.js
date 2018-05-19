import { appName } from '../config'
import { Record, Map } from 'immutable'
import { createSelector } from 'reselect'
import { takeEvery, all, put, call } from 'redux-saga/effects'
import firebase from 'firebase/app'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const FETCH_EVENTS_REQUEST = `${prefix}/FETCH_EVENTS_REQUEST`
export const FETCH_EVENTS_SUCCESS = `${prefix}/FETCH_EVENTS_SUCCESS`
export const FETCH_EVENTS_FAIL = `${prefix}/FETCH_EVENTS_FAIL`

/**
 * Reducer
 * */
const ReducerState = Record({
  loading: false,
  loaded: false,
  entities: new Map({})
})

const EventRecord = Record({
  title: null,
  url: null,
  where: null,
  when: null,
  month: null,
  submissionDeadline: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_EVENTS_REQUEST:
      return state.set('loading', true)

    case FETCH_EVENTS_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .update('entities', (entities) =>
          Object.entries(payload).reduce(
            (map, [key, value]) => map.set(key, new EventRecord(value)),
            new Map({})
          )
        )

    case FETCH_EVENTS_FAIL:
      return state.set('loading', false).set('loaded', false)

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const eventsSelector = createSelector(stateSelector, (state) =>
  state.entities.toObject()
)

/**
 * Action Creators
 * */

export function fetchEvents() {
  return { type: FETCH_EVENTS_REQUEST }
}

/**
 *  Sagas
 * */

export function* fetchEventsSaga() {
  const database = firebase.database().ref('/events')

  try {
    const data = yield call([database, database.once], 'value')

    yield put({ type: FETCH_EVENTS_SUCCESS, payload: data.val() })
  } catch (error) {
    yield put({ type: FETCH_EVENTS_FAIL, payload: error })
  }
}

export function* saga() {
  yield all([takeEvery(FETCH_EVENTS_REQUEST, fetchEventsSaga)])
}
