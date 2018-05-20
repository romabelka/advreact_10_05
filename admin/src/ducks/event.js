import { appName } from '../config'
import { Record, List } from 'immutable'
import { createSelector } from 'reselect'
import { takeEvery, all, put } from 'redux-saga/effects'
import firebase from 'firebase/app'

/**
 * Constants
 * */
export const moduleName = 'event'
const prefix = `${appName}/${moduleName}`
export const GET_LIST_REQUEST = `${prefix}/GET_LIST_REQUEST`
export const GET_LIST_FAIL = `${prefix}/GET_LIST_FAIL`
export const GET_LIST_SUCCESS = `${prefix}/GET_LIST_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([]),
  loading: false,
  loaded: false,
  error: null
})

const EventRecord = Record({
  id: null,
  month: '',
  submissionDeadline: '',
  title: '',
  url: '',
  when: '',
  where: ''
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload, error } = action

  switch (type) {
    case GET_LIST_REQUEST:
      return state.set('loading', true)
    case GET_LIST_FAIL:
      return state.set('loading', false).set('error', error)
    case GET_LIST_SUCCESS:
      const eventList = Object.keys(payload.list).map((key) => ({
        id: key,
        ...payload.list[key]
      }))
      return state
        .set(
          'entities',
          new List(eventList.map((item) => new EventRecord(item)))
        )
        .set('loading', false)
        .set('loaded', true)
        .set('error', null)
    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const eventSelector = createSelector(stateSelector, (state) => {
  return state.entities.valueSeq().toArray()
})

/**
 * Action Creators
 * */

export function getListEvent() {
  return {
    type: GET_LIST_REQUEST,
    payload: {}
  }
}

/**
 *  Sagas
 * */

export function* getEventListSaga() {
  try {
    const eventsRef = yield firebase.database().ref('/events')

    const events = yield eventsRef.once('value')

    yield put({ type: GET_LIST_SUCCESS, payload: { list: events.val() } })
  } catch (error) {
    yield put({ type: GET_LIST_FAIL, error })
  }
}

export function* saga() {
  yield all([takeEvery(GET_LIST_REQUEST, getEventListSaga)])
}
