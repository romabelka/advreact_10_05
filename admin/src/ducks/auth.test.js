import { call, put, take, apply, takeEvery, all } from 'redux-saga/effects'
import firebase from 'firebase/app'

import {
  signInSaga,
  signUpSaga,
  SIGN_IN_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_ERROR,
  SIGN_IN_REQUESTS_LIMIT,
  SIGN_UP_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_ERROR
} from './auth'

describe('Auth duck', () => {
  const auth = firebase.auth()
  const goodCredentials = {
    email: 'exampl1@home.ru',
    password: '12345678'
  }

  const badCredentials = {
    email: 'newuser@home.ru',
    password: '12345678'
  }

  describe('Positive cases', () => {
    const user = apply(auth, auth.signInWithEmailAndPassword, [
      goodCredentials.email,
      goodCredentials.password
    ])

    it('should sign in user', () => {
      const sagaProcess = signInSaga()

      expect(sagaProcess.next().value).toEqual(take(SIGN_IN_REQUEST))
      expect(
        sagaProcess.next({ type: SIGN_IN_REQUEST, payload: goodCredentials })
          .value
      ).toEqual(user)
      expect(sagaProcess.next(user).value).toEqual(
        put({ type: SIGN_IN_SUCCESS, payload: { user } })
      )
      expect(sagaProcess.next().done).toEqual(false)
    })

    it('should sign up user', () => {
      const sagaProcess = signUpSaga({
        type: SIGN_UP_REQUEST,
        payload: badCredentials
      })

      const user = call(
        [auth, auth.createUserWithEmailAndPassword],
        badCredentials.email,
        badCredentials.password
      )

      expect(sagaProcess.next().value).toEqual(user)
      expect(sagaProcess.next(user).value).toEqual(
        put({ type: SIGN_UP_SUCCESS, payload: { user } })
      )
      expect(sagaProcess.next().done).toEqual(true)
    })
  })

  describe('Negative cases', () => {
    const user = apply(auth, auth.signInWithEmailAndPassword, [
      badCredentials.email,
      badCredentials.password
    ])

    const error = new Error()

    it('should reject signing in with invalid credentials', () => {
      const sagaProcess = signInSaga()

      expect(sagaProcess.next().value).toEqual(take(SIGN_IN_REQUEST))

      expect(
        sagaProcess.next({ type: SIGN_IN_REQUEST, payload: badCredentials })
          .value
      ).toEqual(user)
      // expect(sagaProcess.next(user).value).toEqual( put({ type: SIGN_IN_ERROR, error }))
      // приходит success, не понимаю как решать
      // throw делает искусственную ошибку, а не сага сама
      expect(sagaProcess.throw(error).value).toEqual(
        put({ type: SIGN_IN_ERROR, error })
      )
      expect(sagaProcess.next().done).toEqual(false)
    })

    it('should limit attempts of invalid signing in', () => {
      const sagaProcess = signInSaga()

      for (let i = 0; i < 3; i++) {
        expect(sagaProcess.next().value).toEqual(take(SIGN_IN_REQUEST))

        expect(
          sagaProcess.next({ type: SIGN_IN_REQUEST, payload: badCredentials })
            .value
        ).toEqual(user)
        expect(sagaProcess.throw(error).value).toEqual(
          put({ type: SIGN_IN_ERROR, error })
        )
      }

      expect(sagaProcess.next().value).toEqual(
        put({ type: SIGN_IN_REQUESTS_LIMIT })
      )
      expect(sagaProcess.next().done).toEqual(true)
    })

    it('should reject attempts to sign up with existing credentials', () => {
      const sagaProcess = signUpSaga({
        type: SIGN_UP_REQUEST,
        payload: goodCredentials
      })

      const user = call(
        [auth, auth.createUserWithEmailAndPassword],
        goodCredentials.email,
        goodCredentials.password
      )

      expect(sagaProcess.next().value).toEqual(user)
      expect(sagaProcess.throw(error).value).toEqual(
        put({ type: SIGN_UP_ERROR, error })
      )
      expect(sagaProcess.next().done).toEqual(true)
    })
  })
})
