import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { createSelector } from 'reselect'
import { put, call, all, takeEvery, select } from 'redux-saga/effects'
import { reset } from 'redux-form'
import firebase from 'firebase/app'
import { fbToEntities } from './utils'

/**
 * Constants
 * */
export const moduleName = 'cart'
const prefix = `${appName}/${moduleName}`
export const DELETE_ITEM = `${prefix}/DELETE_ITEM`
export const DELETE_ITEM_SUCCESS = `${prefix}/DELETE_ITEM_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new OrderedMap({})
})

const PersonRecord = Record({
  uid: null,
  firstName: null,
  lastName: null,
  email: null,
  events: []
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case DELETE_ITEM_SUCCESS:
      // return state.updateIn(
      //   ['entities', payload.personUid, 'events'],
      //   (events) => [...new Set([...events, payload.eventUid])]
      // )
      return state

    default:
      return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = (state) => state[moduleName]
export const entitiesSelector = createSelector(
  stateSelector,
  (state) => state.entities
)
export const peopleSelector = createSelector(entitiesSelector, (entities) =>
  entities.valueSeq().toArray()
)
export const idSelector = (_, props) => props.uid
export const personSelector = createSelector(
  entitiesSelector,
  idSelector,
  (entities, uid) => entities.get(uid)
)

export const personEventsSelector = createSelector(
  personSelector,
  (person) => person.events
)

/**
 * Action Creators
 * */

export function deleteItemByType(eventUid, personUid) {
  return {
    type: DELETE_ITEM,
    payload: { eventUid, personUid }
  }
}

/**
 * Sagas
 */

export function* deleteItemByTypeSaga(action) {
  // const { eventUid, personUid } = action.payload
  // const eventsRef = firebase.database().ref(`people/${personUid}/events`)
  // const events = yield select(personEventsSelector, { uid: personUid })
  // const nextPersonEvents = [...new Set([...events, eventUid])]
  //
  // yield call([eventsRef, eventsRef.set], nextPersonEvents)

  yield put({
    type: DELETE_ITEM_SUCCESS,
    payload: action.payload
  })
}

export const saga = function*() {
  yield all([takeEvery(DELETE_ITEM, deleteItemByTypeSaga)])
}
