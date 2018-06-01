import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { put, call, all, takeEvery } from 'redux-saga/effects'
import firebase from 'firebase/app'

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
  elements: new OrderedMap({})
})

export default function reducer(state = new ReducerState(), action) {
  const { type } = action

  switch (type) {
    case DELETE_ITEM_SUCCESS:
      // можно ли при данном подходе пропатчить список events или people?
      return state
    default:
      return state
  }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export function deleteItemByType(itemUid, type) {
  return {
    type: DELETE_ITEM,
    payload: { itemUid, type }
  }
}

/**
 * Sagas
 */

export function* deleteItemByTypeSaga(action) {
  const { itemUid, type } = action.payload
  const itemRef = firebase.database().ref(`${type}/${itemUid}`)

  yield call([itemRef, itemRef.remove], '')

  yield put({
    type: DELETE_ITEM_SUCCESS,
    payload: action.payload
  })
}

export const saga = function*() {
  yield all([takeEvery(DELETE_ITEM, deleteItemByTypeSaga)])
}
