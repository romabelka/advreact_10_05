import {
  signUpSaga,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  signInSaga,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS
} from './auth'
import { call, put, take, apply } from 'redux-saga/effects'
import firebase from 'firebase/app'

describe('auth duck', () => {
  it('should sign up', () => {
    const user = {
      email: 'test@test.com',
      password: 'something_secret'
    }

    const saga = signUpSaga({
      type: SIGN_UP_REQUEST,
      payload: user
    })

    const auth = firebase.auth()

    expect(saga.next().value).toEqual(
      call(
        [auth, auth.createUserWithEmailAndPassword],
        user.email,
        user.password
      )
    )

    expect(saga.next(user).value).toEqual(
      put({ type: SIGN_UP_SUCCESS, payload: { user } })
    )
  })

  it('should sign in', () => {
    const user = {
      email: 'test@test.com',
      password: 'something_secret'
    }

    const saga = signInSaga()

    expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))

    const auth = firebase.auth()

    expect(
      saga.next({
        type: SIGN_IN_REQUEST,
        payload: user
      }).value
    ).toEqual(
      apply(auth, auth.signInWithEmailAndPassword, [user.email, user.password])
    )

    expect(saga.next(user).value).toEqual(
      put({ type: SIGN_IN_SUCCESS, payload: { user } })
    )
  })
})
