import React, { Component } from 'react'

class Event extends Component {
  render() {
    const {
      title,
      url,
      where,
      when,
      month,
      submissionDeadline
    } = this.props.event
    return (
      <div>
        <p>{title}</p>
        <p>
          <a href={url}>{url}</a>
        </p>
        <p>{where}</p>
        <p>{when}</p>
        <p>{month}</p>
        <p>{submissionDeadline}</p>
      </div>
    )
  }
}

export default Event
