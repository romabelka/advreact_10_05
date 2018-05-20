import { appName } from '../config'
import { List, Record } from 'immutable'
import { takeEvery, all, put, call } from 'redux-saga/effects'
import firebase from 'firebase/app'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const LOAD_EVENTS = `${prefix}/LOAD_EVENTS`
export const LOAD_EVENTS_REQUEST = `${prefix}/LOAD_EVENTS_REQUEST`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([])
})

const EventRecord = Record({
  title: null,
  month: null,
  where: null,
  when: null,
  url: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case LOAD_EVENTS:
      return state.set('entities', getEntities(payload.eventsObj))

    default:
      return state
  }
}

function getEntities(obj) {
  const events = Object.keys(obj).map((ID) => {
    return obj[ID]
  })

  return events.reduce((res, conference) => {
    return res.push(new EventRecord(conference))
  }, new List())
}

/**
 * Action Creators
 * */

export function loadEvents() {
  return {
    type: LOAD_EVENTS_REQUEST,
    payload: {}
  }
}

/**
 *  Sagas
 * */

export function* loadEventsSaga() {
  const eventsRef = firebase.database().ref('/events')
  const snap = yield call([eventsRef, eventsRef.once], 'value')
  yield put({ type: LOAD_EVENTS, payload: { eventsObj: snap.val() } })
}

export function* saga() {
  yield all([takeEvery(LOAD_EVENTS_REQUEST, loadEventsSaga)])
}
