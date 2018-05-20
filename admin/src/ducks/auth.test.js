import { call, take, put, apply } from 'redux-saga/effects'
import {
  signInSaga,
  signIn,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_REQUESTS_LIMIT,
  signUpSaga,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from './auth'
import firebase from 'firebase/app'

describe('auth duck', () => {
  const credentials = {
    email: 'test@example.com',
    password: '12341234'
  }
  const user = {
    first: 'John',
    email: 'test@example.com'
  }
  const auth = firebase.auth()

  it('should sign in', () => {
    const sagaProcess = signInSaga()

    expect(sagaProcess.next().value).toEqual(take(SIGN_IN_REQUEST))

    expect(
      sagaProcess.next(signIn(credentials.email, credentials.password)).value
    ).toEqual(
      apply(auth, auth.signInWithEmailAndPassword, [
        credentials.email,
        credentials.password
      ])
    )

    expect(sagaProcess.next(user).value).toEqual(
      put({ type: SIGN_IN_SUCCESS, payload: { user } })
    )
  })

  it('should handle incorrect credentials and limit the number of sign in attempts to 3', () => {
    const error = new Error('sign in error')

    const sagaProcess = signInSaga()

    for (let i = 0; i < 3; i++) {
      expect(sagaProcess.next().value).toEqual(take(SIGN_IN_REQUEST))

      expect(
        sagaProcess.next(signIn(credentials.email, credentials.password)).value
      ).toEqual(
        apply(auth, auth.signInWithEmailAndPassword, [
          credentials.email,
          credentials.password
        ])
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

  it('should sign up', () => {
    const sagaProcess = signUpSaga({ payload: { ...credentials } })

    expect(sagaProcess.next().value).toEqual(
      call(
        [auth, auth.createUserWithEmailAndPassword],
        credentials.email,
        credentials.password
      )
    )

    expect(sagaProcess.next(user).value).toEqual(
      put({ type: SIGN_UP_SUCCESS, payload: { user } })
    )
  })

  it('should handle sign up error', () => {
    const error = new Error('sign up error')

    const sagaProcess = signUpSaga({ payload: { ...credentials } })

    expect(sagaProcess.next().value).toEqual(
      call(
        [auth, auth.createUserWithEmailAndPassword],
        credentials.email,
        credentials.password
      )
    )

    expect(sagaProcess.throw(error).value).toEqual(
      put({ type: SIGN_UP_ERROR, error })
    )
  })
})
