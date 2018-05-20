import { put, apply, call, take } from 'redux-saga/effects'
import firebase from 'firebase/app'
import {
  signInSaga,
  signUpSaga,
  SIGN_IN_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_ERROR,
  SIGN_IN_REQUESTS_LIMIT,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from './auth'

describe('people auth', () => {
  // Удачный логин
  it('should sign-in', () => {
    const data = { email: 'test@mail.ru', password: '12345678' }

    const sagaProcess = signInSaga({
      type: SIGN_IN_REQUEST,
      payload: data
    })

    expect(sagaProcess.next().value).toEqual(take(SIGN_IN_REQUEST))

    // НЕ понятно зачем передавать {payload: data}. И как это вообще работает
    expect(sagaProcess.next({ payload: data }).value).toEqual(
      call(firebase.auth)
    )

    const auth = firebase.auth()

    // НЕ понятно зачем передавать auth. И как это вообще работает.
    expect(sagaProcess.next(auth).value).toEqual(
      apply(auth, auth.signInWithEmailAndPassword, [data.email, data.password])
    )

    const user = apply(auth, auth.signInWithEmailAndPassword, [
      data.email,
      data.password
    ])

    expect(sagaProcess.next(user).value).toEqual(
      put({ type: SIGN_IN_SUCCESS, payload: { user } })
    )
  })

  // Limit по авторизации
  it('should sign-in limit', () => {
    const data = { email: 'test@mail.ru', password: '123456' }

    const sagaProcess = signInSaga({
      type: SIGN_IN_REQUEST,
      payload: data
    })

    for (let i = 3; i > 0; i--) {
      expect(sagaProcess.next().value).toEqual(take(SIGN_IN_REQUEST))

      // НЕ понятно зачем передавать {payload: data}. И как это вообще работает
      expect(sagaProcess.next({ payload: data }).value).toEqual(
        call(firebase.auth)
      )

      const auth = firebase.auth()

      // НЕ понятно зачем передавать auth. И как это вообще работает.
      expect(sagaProcess.next(auth).value).toEqual(
        apply(auth, auth.signInWithEmailAndPassword, [
          data.email,
          data.password
        ])
      )

      const user = apply(auth, auth.signInWithEmailAndPassword, [
        data.email,
        data.password
      ])

      sagaProcess.next()
    }

    expect(sagaProcess.next().value).toEqual(
      put({ type: SIGN_IN_REQUESTS_LIMIT })
    )
  })

  // Удачное добавление нового пользователя
  it('should sign-up', () => {
    const data = { email: 'test1@mail.ru', password: '12345678' }

    const sagaProcess = signUpSaga({
      type: SIGN_UP_REQUEST,
      payload: data
    })

    // НЕ понятно зачем передавать {payload: data}. И как это вообще работает
    expect(sagaProcess.next({ payload: data }).value).toEqual(
      call(firebase.auth)
    )

    const auth = firebase.auth()

    // НЕ понятно зачем передавать auth. И как это вообще работает.
    expect(sagaProcess.next(auth).value).toEqual(
      apply(auth, auth.createUserWithEmailAndPassword, [
        data.email,
        data.password
      ])
    )

    const user = apply(auth, auth.createUserWithEmailAndPassword, [
      data.email,
      data.password
    ])

    expect(sagaProcess.next(user).value).toEqual(
      put({ type: SIGN_UP_SUCCESS, payload: { user } })
    )
  })
})
