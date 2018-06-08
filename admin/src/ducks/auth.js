import { all, takeEvery, take, put, apply, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { appName } from '../config'
import { createSelector } from 'reselect'
import { Record } from 'immutable'
import firebase from 'firebase/app'
import { replace } from 'react-router-redux'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`

export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null,
  loading: false,
  error: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case SIGN_IN_START:
    case SIGN_UP_START:
      return state.set('error', null).set('loading', true)

    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
    case SIGN_OUT_SUCCESS:
      return state.set('loading', false).set('user', payload.user)

    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR:
      return state.set('loading', false).set('error', payload.error.message)

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

export function signOut() {
  return {
    type: SIGN_OUT_REQUEST
  }
}

/**
 * Sagas
 */

export const signUpSaga = function*() {
  while (true) {
    const action = yield take(SIGN_UP_REQUEST)
    const { email, password } = action.payload

    yield put({
      type: SIGN_UP_START
    })

    try {
      const auth = firebase.auth()
      yield call([auth, auth.createUserWithEmailAndPassword], email, password)
    } catch (error) {
      yield put({
        type: SIGN_UP_ERROR,
        payload: { error }
      })
    }
  }
}

export const signInSaga = function*(action) {
  const { email, password } = action.payload

  yield put({
    type: SIGN_IN_START
  })

  try {
    const auth = firebase.auth()
    yield apply(auth, auth.signInWithEmailAndPassword, [email, password])
  } catch (error) {
    yield put({
      type: SIGN_IN_ERROR,
      payload: { error }
    })
  }
}

export const signOutSaga = function*() {
  const auth = firebase.auth()
  yield apply(auth, auth.signOut)
}

const createAuthChannel = () =>
  eventChannel((emit) =>
    firebase.auth().onAuthStateChanged((user) => emit({ user }))
  )

export const watchStatusChangeSaga = function*() {
  const chan = yield call(createAuthChannel)
  while (true) {
    const { user } = yield take(chan)

    if (user) {
      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    } else {
      yield put({
        type: SIGN_OUT_SUCCESS,
        payload: { user }
      })
      yield put(replace('/auth/sign-in'))
    }
  }
}

export const saga = function*() {
  yield all([
    takeEvery(SIGN_IN_REQUEST, signInSaga),
    takeEvery(SIGN_OUT_REQUEST, signOutSaga),
    signUpSaga(),
    watchStatusChangeSaga()
  ])
}
