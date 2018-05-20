import { call, put, take, apply } from 'redux-saga/effects'
import { reset } from 'redux-form'
import firebase from 'firebase/app'
import {
  signIn,
  signUp,
  signUpSaga,
  signInSaga,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_REQUESTS_LIMIT
} from './auth'
import { user } from '../mocks/user'

const auth = firebase.auth()
const { email, password } = user

describe('auth duck', () => {
  it('should sign up success', () => {
    const sagaProcess = signUpSaga(signUp(email, password))

    expect(sagaProcess.next().value).toEqual(
      call([auth, auth.createUserWithEmailAndPassword], email, password)
    )

    expect(sagaProcess.next(user).value).toEqual(
      put({ type: SIGN_UP_SUCCESS, payload: { user } })
    )

    expect(sagaProcess.next().done).toEqual(true)
  })
  it('should sign up with error', () => {
    const error = new Error('sign up with error')
    const sagaProcess = signUpSaga(signUp(email, password))

    expect(sagaProcess.next().value).toEqual(
      call([auth, auth.createUserWithEmailAndPassword], email, password)
    )

    expect(sagaProcess.throw(error).value).toEqual(
      put({ type: SIGN_UP_ERROR, error })
    )

    expect(sagaProcess.next().done).toEqual(true)
  })

  it('should sign in success', () => {
    const sagaProcess = signInSaga(signIn(email, password))

    expect(sagaProcess.next().value).toEqual(take(SIGN_IN_REQUEST))

    expect(sagaProcess.next({ payload: { email, password } }).value).toEqual(
      apply(auth, auth.signInWithEmailAndPassword, [email, password])
    )

    expect(sagaProcess.next(user).value).toEqual(
      put({ type: SIGN_IN_SUCCESS, payload: { user } })
    )

    // without counting attempts
  })
  it('should limit the count of attempts to 3 and throw error', () => {
    const error = new Error('sign in with error')
    const sagaProcess = signInSaga(signIn(email, password))

    for (let i = 0; i < 3; i++) {
      expect(sagaProcess.next().value).toEqual(take(SIGN_IN_REQUEST))

      expect(sagaProcess.next({ payload: { email, password } }).value).toEqual(
        apply(auth, auth.signInWithEmailAndPassword, [email, password])
      )

      expect(sagaProcess.throw(error).value).toEqual(
        put({ type: SIGN_IN_ERROR, error })
      )
    }

    expect(sagaProcess.next().value).toEqual(
      put({ type: SIGN_IN_REQUESTS_LIMIT })
    )

    expect(sagaProcess.next().done).toEqual(true)
  })
})
