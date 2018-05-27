import { all, takeEvery, put, call } from 'redux-saga/effects'
import { appName } from '../config'
import { Record, OrderedSet, OrderedMap } from 'immutable'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import { fbToEntities } from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`
export const FETCH_PAGINATION_EVENTS_REQUEST = `${prefix}/FETCH_PAGINATION_EVENTS_REQUEST`
export const FETCH_PAGINATION_EVENTS_START = `${prefix}/FETCH_PAGINATION_EVENTS_START`
export const FETCH_PAGINATION_EVENTS_SUCCESS = `${prefix}/FETCH_PAGINATION_EVENTS_SUCCESS`
export const TOGGLE_SELECTION = `${prefix}/TOGGLE_SELECTION`
export const CLEAR_DATA = `${prefix}/CLEAR_DATA`
export const CHANGE_LOADING_INFO = `${prefix}/CHANGE_LOADING_INFO`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  selected: new OrderedSet(),
  entities: new OrderedMap(),
  loadedRowCount: 0,
  loadingRowCount: 0,
  loadedRowsMap: {}
})

export const EventRecord = Record({
  uid: null,
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_START:
    case FETCH_PAGINATION_EVENTS_START:
      return state.set('loading', true)

    case CHANGE_LOADING_INFO:
      return state.merge(payload)

    case FETCH_ALL_SUCCESS:
    case FETCH_PAGINATION_EVENTS_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload, EventRecord))

    case TOGGLE_SELECTION:
      return state.update(
        'selected',
        (selected) =>
          selected.has(payload.uid)
            ? selected.remove(payload.uid)
            : selected.add(payload.uid)
      )

    case CLEAR_DATA:
      return state
        .set('loadedRowCount', 0)
        .set('loadingRowCount', 0)
        .set('loading', false)
        .set('loaded', false)

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
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)
export const loadedRowCount = createSelector(
  stateSelector,
  (state) => state.loadedRowCount
)
export const loadingRowCount = createSelector(
  stateSelector,
  (state) => state.loadingRowCount
)
export const loadedRowsMap = createSelector(
  stateSelector,
  (state) => state.loadedRowsMap
)
export const eventListSelector = createSelector(entitiesSelector, (entities) =>
  entities.valueSeq().toArray()
)

export const selectedIdsSelector = createSelector(stateSelector, (state) =>
  state.selected.toArray()
)

export const selectedEventsSelector = createSelector(
  entitiesSelector,
  selectedIdsSelector,
  (entities, ids) => ids.map((id) => entities.get(id))
)

/**
 * Action Creators
 * */

export function fetchAllEvents() {
  return {
    type: FETCH_ALL_REQUEST
  }
}
export function fetchEventsWithPagination(
  { startAt, endAt } = { startAt: 0, endAt: 10 }
) {
  return {
    type: FETCH_PAGINATION_EVENTS_REQUEST,
    payload: { startAt, endAt }
  }
}

export function toggleSelection(uid) {
  return {
    type: TOGGLE_SELECTION,
    payload: { uid }
  }
}

export function changeLoadingInfo(data) {
  return {
    type: CHANGE_LOADING_INFO,
    payload: { ...data }
  }
}

export function clearData() {
  return {
    type: CLEAR_DATA
  }
}

/**
 * Sagas
 * */

export function* fetchAllSaga() {
  const ref = firebase.database().ref('events')

  yield put({
    type: FETCH_ALL_START
  })

  const snapshot = yield call([ref, ref.once], 'value')

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: snapshot.val()
  })
}
export function* fetchWithPaginationSaga({ payload }) {
  const { startAt, endAt } = payload
  console.log('pagination', startAt, endAt)
  const ref = firebase
    .database()
    .ref('events')
    .orderByKey()
  // .startAt(startAt)
  // .endAt(endAt)

  yield put({
    type: FETCH_ALL_START
  })

  const snapshot = yield call([ref, ref.once], 'value')
  console.log('snapshot', snapshot.val())

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: snapshot.val()
  })
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(FETCH_PAGINATION_EVENTS_REQUEST, fetchWithPaginationSaga)
  ])
}
