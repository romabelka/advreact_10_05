import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { TransitionMotion, spring } from 'react-motion'
import { selectedEventsSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'

class SelectedEvents extends Component {
  static propTypes = {}

  render() {
    return (
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {(interpolated) => (
          <div>
            {interpolated.map((item) => (
              <div key={item.key} style={item.style}>
                <SelectedEventCard event={item.data} />
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    )
  }

  willEnter = () => ({
    opacity: 0
  })

  willLeave = () => ({
    opacity: spring(0, { stiffness: 15, dumping: 40 })
  })

  getStyles() {
    return this.props.events.map((event) => ({
      key: event.uid,
      style: {
        opacity: spring(1, { stiffness: 10, dumping: 30 })
      },
      data: event
    }))
  }
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
