import { appName } from '../config'
import { Record } from 'immutable'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import {
  apply,
  put,
  call,
  all,
  takeEvery,
  select,
  take,
  fork,
  spawn,
  cancel,
  cancelled,
  race
} from 'redux-saga/effects'
import { delay, eventChannel } from 'redux-saga'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`
export const SIGN_IN_REQUESTS_LIMIT = `${prefix}/SIGN_IN_REQUESTS_LIMIT`
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return state.set('user', payload.user)

    default:
      return state
  }
}

/**
 * Selectors
 * */
export const userSelector = (state) => state[moduleName].user
export const authorizedSelector = createSelector(userSelector, (user) => !!user)

/**
 * Action Creators
 * */

export function signUp(email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: { email, password }
  }
}

export function signIn(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  }
}
/*
export function signIn(email, password) {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => dispatch({ type: SIGN_IN_SUCCESS, payload: { user } }))
  }
}
*/

/**
 * Sagas
 */

export function* signUpSaga({ payload: { email, password } }) {
  const auth = firebase.auth()
  try {
    const user = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      email,
      password
    )

    yield put({ type: SIGN_UP_SUCCESS, payload: { user } })
  } catch (error) {
    yield put({ type: SIGN_UP_ERROR, error })
  }
}

export function* signInSaga() {
  for (let i = 0; i < 3; i++) {
    const {
      payload: { email, password }
    } = yield take(SIGN_IN_REQUEST)

    const auth = firebase.auth()

    try {
      const user = yield apply(auth, auth.signInWithEmailAndPassword, [
        email,
        password
      ])

      yield put({ type: SIGN_IN_SUCCESS, payload: { user } })
    } catch (error) {
      yield put({ type: SIGN_IN_ERROR, error })
    }
  }

  yield put({ type: SIGN_IN_REQUESTS_LIMIT })
}

const createEventChannel = () =>
  eventChannel((emit) => {
    const callback = (user) => emit({ user })
    const error = (error) => emit({ error })

    return firebase.auth().onAuthStateChanged(callback, error)
  })

export function* realtimeSyncSaga() {
  const channel = yield call(createEventChannel)
  while (true) {
    const { user, error } = yield take(channel)

    console.log('auth')

    if (!user) continue

    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    })
  }
}

export function* saga() {
  yield spawn(realtimeSyncSaga)

  yield all([takeEvery(SIGN_UP_REQUEST, signUpSaga), signInSaga()])
}

/*
firebase.auth().onAuthStateChanged((user) => {
  if (!user) return

  window.store.dispatch({
    type: SIGN_IN_SUCCESS,
    payload: { user }
  })
})
*/
