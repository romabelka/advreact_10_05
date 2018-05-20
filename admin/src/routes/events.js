import React from 'react'
import { connect } from 'react-redux'
import { loadEvents, getEvents, getEventsLoadError } from '../ducks/events'
import EventList from '../components/events/event-list'

class EventsPage extends React.Component {
    constructor(props) {
        super(props)
        loadEvents();
    }

    render() {
        const { events, eventsLoadError } = this.props
        return (
            <div>
                <h2>Events List:</h2>
                {eventsLoadError && <div className="error">Something was wrong!!!</div>}
                <EventList events={events} />
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    events: getEvents(state),
    eventsLoadError: getEventsLoadError(state)
})

export default connect(mapStateToProps, loadEvents)(EventsPage)