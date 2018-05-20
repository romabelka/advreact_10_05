import {
  authorizedSelector,
  moduleName,
  ReducerRecord,
  SIGN_UP_SUCCESS,
  signUp,
  signIn,
  SIGN_UP_REQUEST,
  SIGN_IN_REQUEST
} from './auth'
import reducer from './auth'

describe('auth duck', () => {
  describe('authorizedSelector', () => {
    it('should authorized', () => {
      const state = {}
      state[moduleName] = { user: { email: '@' } }
      expect(authorizedSelector(state)).toEqual(true)
    })
    it('should not authorized', () => {
      const state = {}
      state[moduleName] = { user: null }
      expect(authorizedSelector(state)).toEqual(false)
    })
  })
  describe('reducer', () => {
    it('should set user to state', () => {
      const state = new ReducerRecord()
      const user = { email: '@' }
      const action = { type: SIGN_UP_SUCCESS, payload: { user } }
      expect(reducer(state, action).get('user')).toEqual(user)
    })
  })
  describe('signUp', () => {
    it('should return action SIGN_UP_REQUEST', () => {
      const email = '@'
      const password = 1
      const action = {
        type: SIGN_UP_REQUEST,
        payload: { email, password }
      }
      expect(signUp(email, password)).toEqual(action)
    })
  })
  describe('signIn', () => {
    it('should return action SIGN_IN_REQUEST', () => {
      const email = '@'
      const password = 1
      const action = {
        type: SIGN_IN_REQUEST,
        payload: { email, password }
      }
      expect(signIn(email, password)).toEqual(action)
    })
  })
})
