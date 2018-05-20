import React from 'react'
import Event from './event'

class EventList extends React.Component {
    render() {
        return (
            <ul>
                {this.getEvents()}
            </ul>
        )
    }

    getEvents() {
        const { events } = this.props

        if (!events) return []

        return events.map((value, key) => {
            return (<li key={key}><Event event={value} /></li>)
        })
    }
}


export default EventList