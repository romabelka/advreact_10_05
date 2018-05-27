import React from 'react'
import { EventsTable } from './events-table-virtualized'
import { shallow, mount } from 'enzyme'
import eventsMocks from '../../mocks/conferences'

const events = eventsMocks.map((event) => ({
  ...event,
  uid: Math.random().toString()
}))

describe('EventsTable', () => {
  it('should render some events', () => {
    const container = mount(<EventsTable events={events} />)

    expect(container.find('.test--event-list_item').length).toBeGreaterThan(1)
  })

  it('should fetch events', (done) => {
    shallow(<EventsTable events={[]} fetchLazyEvents={() => done()} />)
  })
})
