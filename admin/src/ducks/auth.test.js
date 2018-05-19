import {
  signUpSaga,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  signInSaga,
  SIGN_IN_REQUEST,
  SIGN_IN_REQUESTS_LIMIT,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR
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

  it('should handle failed sign up', () => {
    const user = {
      email: '',
      password: ''
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

    expect(saga.throw('error').value).toEqual(
      put({ type: SIGN_UP_ERROR, error: 'error' })
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

  it('should handle failed sign in', () => {
    const user = {
      email: '',
      password: ''
    }

    const saga = signInSaga()

    for (let i = 0; i < 3; i++) {
      expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))

      const auth = firebase.auth()

      expect(
        saga.next({
          type: SIGN_IN_REQUEST,
          payload: user
        }).value
      ).toEqual(
        apply(auth, auth.signInWithEmailAndPassword, [
          user.email,
          user.password
        ])
      )

      expect(saga.throw('error').value).toEqual(
        put({ type: SIGN_IN_ERROR, error: 'error' })
      )
    }

    expect(saga.next().value).toEqual(put({ type: SIGN_IN_REQUESTS_LIMIT }))
  })
})
