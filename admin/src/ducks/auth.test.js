import { apply, call, put, take } from 'redux-saga/effects'
import firebase from 'firebase/app'
import reducer, {
  ReducerRecord,
  signUpSaga,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  signInSaga,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_REQUESTS_LIMIT
} from './auth'

describe('auth duck', () => {
  /**
   * Reducer
   * */
  it('should sign in', () => {
    const state = ReducerRecord()
    const user = {
      email: 'test@test.com'
    }

    const newState = reducer(state, {
      type: SIGN_IN_SUCCESS,
      payload: { user }
    })

    expect(newState).toEqual(ReducerRecord({ user }))
  })

  /**
   * Sagas
   */
  it('should sign up', () => {
    const email = 'test@test.com'
    const password = 'password'
    const user = {
      email
    }

    const sagaProcess = signUpSaga({
      type: SIGN_UP_REQUEST,
      payload: { email, password }
    })

    const auth = firebase.auth()

    expect(sagaProcess.next().value).toEqual(
      call([auth, auth.createUserWithEmailAndPassword], email, password)
    )

    expect(sagaProcess.next(user).value).toEqual(
      put({ type: SIGN_UP_SUCCESS, payload: { user } })
    )

    const error = new Error()

    expect(sagaProcess.throw(error).value).toEqual(
      put({ type: SIGN_UP_ERROR, error })
    )
  })

  it('should sign in', () => {
    const email = 'test@test.com'
    const password = 'password'
    const user = {
      email
    }

    const sagaProcess = signInSaga()

    expect(sagaProcess.next().value).toEqual(take(SIGN_IN_REQUEST))

    const auth = firebase.auth()

    expect(
      sagaProcess.next({ type: SIGN_IN_REQUEST, payload: { email, password } })
        .value
    ).toEqual(apply(auth, auth.signInWithEmailAndPassword, [email, password]))

    expect(sagaProcess.next(user).value).toEqual(
      put({ type: SIGN_IN_SUCCESS, payload: { user } })
    )
  })

  it('should have limit for sign in', () => {
    const email = 'test@test.com'
    const password = 'password'

    const sagaProcess = signInSaga()

    for (let i = 0; i < 3; i++) {
      sagaProcess.next()
      sagaProcess.next({ type: SIGN_IN_REQUEST, payload: { email, password } })

      const error = new Error()

      expect(sagaProcess.throw(error).value).toEqual(
        put({ type: SIGN_IN_ERROR, error })
      )
    }

    expect(sagaProcess.next().value).toEqual(
      put({ type: SIGN_IN_REQUESTS_LIMIT })
    )
  })
})
