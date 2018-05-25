import React from 'react'
import {
  EventsTable,
  width,
  height,
  rowHeight
} from './events-table-virtualized'
import { shallow, mount } from 'enzyme'
import { Table, Column } from 'react-virtualized'

import Loader from '../common/loader'
import eventsMocks from '../../mocks/conferences'

const defaultOverscanRowCount = 1

const events = eventsMocks.map((event) => ({
  ...event,
  uid: Math.random().toString()
}))

describe('EventsVirtualizedTable', () => {
  it('should render loader', () => {
    const container = shallow(<EventsTable events={[]} loading />)

    expect(container.contains(<Loader />)).toBe(true)
  })

  it('should render visible events', () => {
    const container = mount(<EventsTable events={events} />)

    expect(container.find('.test--event-list_item').length).toEqual(
      Math.round(height / rowHeight) + defaultOverscanRowCount
    )
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
      .find('.test--event-list_item')
      .first()
      .simulate('click')

    expect(selectedEventId).toEqual(events[0].uid)
  })
})
