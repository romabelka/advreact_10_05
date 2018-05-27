import { all, takeEvery, put, call, take, select } from 'redux-saga/effects'
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
export const FETCH_LAZY_REQUEST = `${prefix}/FETCH_LAZY_REQUEST`
export const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`
export const FETCH_LAZY_SUCCESS = `${prefix}/FETCH_LAZY_SUCCESS`
export const TOGGLE_SELECTION = `${prefix}/TOGGLE_SELECTION`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  selected: new OrderedSet(),
  entities: new OrderedMap()
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
    case FETCH_LAZY_START:
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload, EventRecord))

    case FETCH_LAZY_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', Object.keys(payload).length < 10)
        .mergeIn(['entities'], fbToEntities(payload, EventRecord))

    case TOGGLE_SELECTION:
      return state.update(
        'selected',
        (selected) =>
          selected.has(payload.uid)
            ? selected.remove(payload.uid)
            : selected.add(payload.uid)
      )

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
export const eventListSelector = createSelector(entitiesSelector, (entities) =>
  entities.valueSeq().toArray()
)
export const lastEventSelector = createSelector(entitiesSelector, (entities) =>
  entities.last()
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

export function fetchLazyEvents() {
  return {
    type: FETCH_LAZY_REQUEST
  }
}

export function toggleSelection(uid) {
  return {
    type: TOGGLE_SELECTION,
    payload: { uid }
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

export function* fetchLazySaga() {
  while (true) {
    yield take(FETCH_LAZY_REQUEST)

    const loaded = yield select(loadedSelector)
    if (loaded) return

    const loading = yield select(loadingSelector)
    if (loading) continue

    yield put({
      type: FETCH_LAZY_START
    })

    const lastEvent = yield select(lastEventSelector)

    const ref = firebase
      .database()
      .ref('events')
      .orderByKey()
      .limitToFirst(10)
      .startAt(lastEvent ? lastEvent.uid : '')

    const snapshot = yield call([ref, ref.once], 'value')

    yield put({
      type: FETCH_LAZY_SUCCESS,
      payload: snapshot.val()
    })
  }
}

export function* saga() {
  yield all([takeEvery(FETCH_ALL_REQUEST, fetchAllSaga), fetchLazySaga()])
}
