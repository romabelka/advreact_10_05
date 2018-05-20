import { call, put } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { generateId } from './utils'
import { addPersonSaga, ADD_PERSON_REQUEST, ADD_PERSON } from './people'

describe('people duck', () => {
  it('should add person', () => {
    const person = {
      firstName: 'Roma',
      lastName: 'Yakobchuk',
      email: 'r.iakobchuk@javascript.ru'
    }

    const sagaProcess = addPersonSaga({
      type: ADD_PERSON_REQUEST,
      payload: { person }
    })

    expect(sagaProcess.next().value).toEqual(call(generateId))

    const id = generateId()

    expect(sagaProcess.next(id).value).toEqual(
      put({ type: ADD_PERSON, payload: { id, ...person } })
    )
    expect(sagaProcess.next().value).toEqual(put(reset('person')))

    expect(sagaProcess.next().done).toEqual(true)
  })
})
