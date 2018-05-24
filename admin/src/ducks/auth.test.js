import firebase from 'firebase/app'
import { signInSaga, signUpSaga } from './auth'
import {
  SIGN_IN_REQUESTS_LIMIT,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS
} from 'admin/src/ducks/auth'
import { all, call, apply, put, takeEvery, take } from 'redux-saga/effects'

describe('auth duck', () => {
  it('should sign in', () => {
    const userData = {
      email: 'asd@asd.asd',
      password: 'asdasdasd'
    }
    const sagaProcess = signInSaga({
      type: SIGN_IN_REQUEST,
      payload: userData
    })

    expect(sagaProcess.next().value).toEqual(take(SIGN_IN_REQUEST))

    const auth = firebase.auth()

    expect(sagaProcess.next({ payload: userData }).value).toEqual(
      apply(auth, auth.signInWithEmailAndPassword, [
        userData.email,
        userData.password
      ])
    )

    expect(sagaProcess.next({ email: userData.email }).value).toEqual(
      put({
        type: SIGN_IN_SUCCESS,
        payload: { user: { email: userData.email } }
      })
    )
  })

  it('should not allow to sign in more then 3 times', () => {
    const userData = {
      email: 'asd@asd.asd',
      password: 'asdasd'
    }
    const sagaProcess = signInSaga({
      type: SIGN_IN_REQUEST,
      payload: userData
    })

    for (let i = 0; i < 3; i++) {
      expect(sagaProcess.next().value).toEqual(take(SIGN_IN_REQUEST))

      sagaProcess.next({ payload: userData })
      sagaProcess.throw(new Error('invalid password'))
    }

    expect(sagaProcess.next().value).toEqual(
      put({ type: SIGN_IN_REQUESTS_LIMIT })
    )
    expect(sagaProcess.next().done).toEqual(true)
  })

  it('should sign up', () => {
    const auth = firebase.auth()

    const userData = {
      email: 'asd@asd.asd',
      password: 'asdasd'
    }

    const sagaProcess = signUpSaga({
      type: SIGN_UP_REQUEST,
      payload: userData
    })

    expect(sagaProcess.next({ payload: userData }).value).toEqual(
      call(
        [auth, auth.createUserWithEmailAndPassword],
        userData.email,
        userData.password
      )
    )

    expect(sagaProcess.next({ email: userData.email }).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user: { email: userData.email } }
      })
    )
    expect(sagaProcess.next().done).toEqual(true)
  })
})
