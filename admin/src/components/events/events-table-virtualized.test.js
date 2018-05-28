import React from 'react'

import { EventsTable } from './events-table-virtualized'
import { shallow, mount } from 'enzyme'
import Loader from '../common/loader'
import eventsMocks from '../../mocks/conferences'
import { Table } from 'react-virtualized'

const events = eventsMocks.map((event) => ({
  ...event,
  uid: Math.random().toString()
}))

describe('EventsTableVirtualized', () => {
  it('should render loader', () => {
    const container = shallow(<EventsTable events={[]} loading />)

    expect(container.contains(<Loader />)).toBe(true)
  })

  it('should render events', () => {
    const container = mount(<EventsTable events={events} />)

    expect(container.find(Table).props().rowCount).toEqual(events.length)

    const rows = container.find('.ReactVirtualized__Table__row')
    const rowsCount = rows.length

    expect(rowsCount).toBeGreaterThan(0)

    const firstRow = rows.first()

    expect(
      firstRow
        .children()
        .at(0)
        .text()
    ).toEqual(events[0].title)
    expect(
      firstRow
        .children()
        .at(1)
        .text()
    ).toEqual(events[0].where)
    expect(
      firstRow
        .children()
        .at(2)
        .text()
    ).toEqual(events[0].when)
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
