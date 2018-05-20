import { appName } from '../config'
import { Record, List } from 'immutable'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { takeEvery, all, put, call } from 'redux-saga/effects'
import { generateId } from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const ADD_EVENT_REQUEST = `${prefix}/ADD_EVENT_REQUEST`
export const ADD_EVENT = `${prefix}/ADD_EVENT`

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
        entities.push(new EventRecord(payload))
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

/**
 *  Sagas
 * */

export function* addEventSaga({ payload: { event } }) {
  const id = yield call(generateId)

  yield put({ type: ADD_EVENT, payload: { id, ...event } })
  yield put(reset('event'))
}

export function* saga() {
  yield all([takeEvery(ADD_EVENT_REQUEST, addEventSaga)])
}
