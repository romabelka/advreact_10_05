import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import { takeEvery, all, put, call } from 'redux-saga/effects'
import { objectToOrderedMap } from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const FETCH_EVENTS_REQUEST = `${prefix}/FETCH_EVENTS_REQUEST`
export const FETCH_EVENTS_SUCCESS = `${prefix}/FETCH_EVENTS_SUCCESS`
export const FETCH_EVENTS_ERROR = `${prefix}/FETCH_EVENTS_ERROR`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: OrderedMap(),
  loading: false,
  loaded: false
})

const EventRecord = Record({
  id: null,
  title: null,
  url: null,
  where: null,
  when: null,
  month: null,
  submissionDeadline: null
})

export default function reducer(state = ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_EVENTS_REQUEST:
      return state.set('loading', true)

    case FETCH_EVENTS_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', objectToOrderedMap(payload, EventRecord))

    case FETCH_EVENTS_ERROR:
      return state.set('loading', false)

    default:
      return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = (state) => state[moduleName]
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)
export const eventsSelector = createSelector(stateSelector, (state) =>
  state.entities.valueSeq().toArray()
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
  const ref = firebase.database().ref('/events')

  try {
    const snapshot = yield call([ref, ref.once], 'value')
    yield put({ type: FETCH_EVENTS_SUCCESS, payload: snapshot.val() })
  } catch (error) {
    yield put({ type: FETCH_EVENTS_ERROR, payload: error })
  }
}

export function* saga() {
  yield all([takeEvery(FETCH_EVENTS_REQUEST, fetchEventsSaga)])
}
