import { appName } from '../config'
import { Record, List } from 'immutable'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import { takeLatest, put } from 'redux-saga/effects'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const GET_EVENTS_REQUEST = `${prefix}/GET_EVENTS_REQUEST`
export const GET_EVENTS_SUCCESS = `${prefix}/GET_EVENTS_SUCCESS`
export const GET_EVENTS_ERROR = `${prefix}/GET_EVENTS_ERROR`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([])
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

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case GET_EVENTS_SUCCESS:
      const eventRecordsArray = payload.map((item) => new EventRecord(item))
      return state.set('entities', new List(eventRecordsArray))

    default:
      return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = (state) => state[moduleName]
export const eventsSelector = createSelector(stateSelector, (state) =>
  state.entities.valueSeq().toArray()
)

/**
 * Action Creators
 * */
export function getEvents() {
  return {
    type: GET_EVENTS_REQUEST
  }
}

/**
 * Sagas
 * */
export function* getEventsSaga() {
  try {
    const db = firebase
      .database()
      .ref('/events')
      .once('value')
    const eventsFbObject = yield db
    const events = eventsFbObject.val()
    const eventsArray = Object.keys(events).map((key) => ({
      id: key,
      ...events[key]
    }))

    yield put({ type: GET_EVENTS_SUCCESS, payload: eventsArray })
  } catch (err) {
    yield put({ type: GET_EVENTS_ERROR, payload: err })
  }
}

export function* saga() {
  yield takeLatest(GET_EVENTS_REQUEST, getEventsSaga)
}
