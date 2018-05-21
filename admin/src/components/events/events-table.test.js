import React from 'react'
import { EventsTable } from './events-table'
import { shallow } from 'enzyme'
import Loader from '../common/loader'
import eventsMocks from '../../mocks/conferences'

const events = eventsMocks.map((event) => ({
  ...event,
  uid: Math.random().toString()
}))

describe('EventsTable', () => {
  it('should render loader', () => {
    const container = shallow(<EventsTable events={[]} loading />)

    expect(container.contains(<Loader />)).toBe(true)
  })

  it('should render events', () => {
    const container = shallow(<EventsTable events={events} />)

    expect(container.find('.test--event-list_item').length).toEqual(
      events.length
    )
  })

  it('should fetch all events', (done) => {
    shallow(<EventsTable events={[]} fetchAllEvents={() => done()} />)
  })

  it('should select an event', () => {
    let selectedEventId = null

    const container = shallow(
      <EventsTable
        events={events}
        handleSelect={(id) => (selectedEventId = id)}
      />
    )

    container
      .find('.test--event-list_item')
      .first()
      .simulate('click')

    expect(selectedEventId).toEqual(events[0].uid)
  })
})
