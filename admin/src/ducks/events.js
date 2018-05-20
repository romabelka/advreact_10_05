import { appName } from '../config'
import { Record, List } from 'immutable'
import { reset } from 'redux-form'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import { takeEvery, all, put, call, apply } from 'redux-saga/effects'
import { generateId } from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const ADD_EVENT_REQUEST = `${prefix}/ADD_EVENT_REQUEST`
export const ADD_EVENT = `${prefix}/ADD_EVENT`

export const GET_EVENT_REQUEST = `${prefix}/GET_EVENT_REQUEST`
export const GET_EVENT_SUCCESS = `${prefix}/GET_EVENT_SUCCESS`
export const GET_EVENT_ERROR = `${prefix}/GET_EVENT_ERROR`

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
  month: null,
  when: null,
  submissionDeadline: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_EVENT:
      return state.update('entities', (entities) =>
        entities.unshift(new EventRecord(payload))
      )
    case GET_EVENT_SUCCESS:
      const eventList = Object.keys(payload).map((key) => ({
        id: key,
        ...payload[key]
      }))
      return state.set(
        'entities',
        new List(eventList.map((item) => new EventRecord(item)))
      )

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

export function addEvent(event) {
  return {
    type: ADD_EVENT_REQUEST,
    payload: { event }
  }
}
export function getEventsList() {
  return {
    type: GET_EVENT_REQUEST
  }
}

/**
 *  Sagas
 * */

export function* addEventSaga({ payload: { event } }) {
  const id = yield call(generateId)

  yield put({ type: ADD_EVENT, payload: { id, ...event } })
  yield put(reset('event'))
}

export function* getEventListSaga() {
  const table = firebase.database().ref('events/')

  try {
    const snapshot = yield apply(table, table.once, ['value'])

    yield put({
      type: GET_EVENT_SUCCESS,
      payload: snapshot.val()
    })
  } catch (error) {
    yield put({ type: GET_EVENT_ERROR, error })
  }
}

export function* saga() {
  yield all([
    takeEvery(ADD_EVENT_REQUEST, addEventSaga),
    takeEvery(GET_EVENT_REQUEST, getEventListSaga)
  ])
}
