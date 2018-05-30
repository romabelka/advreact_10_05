import React from 'react'
import { EventsTable } from './events-table-virtualized'
import { shallow, render, mount } from 'enzyme'
import Loader from '../common/loader'
import eventsMocks from '../../mocks/conferences'

const events = eventsMocks.map((event) => ({
  ...event,
  uid: Math.random().toString()
}))

describe('EventsTable - events-table-virtualized', () => {
  it('should render loader', () => {
    const container = shallow(<EventsTable events={[]} loading />)

    expect(container.contains(<Loader />)).toBe(true)
  })

  it('should render events', () => {
    const container = render(<EventsTable events={events} />)

    expect(container.find('.ReactVirtualized__Table__row').length).toEqual(7)
  })

  it('should fetch all events', (done) => {
    shallow(<EventsTable events={[]} fetchAllEvents={() => done()} />)
  })

  it('should select an event', () => {
    let selectedEventId = null

    const container = mount(
      <EventsTable
        events={events}
        handleSelect={(id) => (selectedEventId = id)}
      />
    )

    container
      .find('.ReactVirtualized__Table__row')
      .first()
      .simulate('click')

    expect(selectedEventId).toEqual(events[0].uid)
  })
})
