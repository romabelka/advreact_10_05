import React, { Component } from 'react'
import EventsTable from '../components/events/virtualized-lazy-table'
import SelectedEvents from '../components/events/selected-events'
import PeopleList from '../components/people/people-list'
import Cart from '../components/cart'

class EventsPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <Cart />
        <PeopleList />
        <SelectedEvents />
        <EventsTable />
      </div>
    )
  }
}

export default EventsPage
