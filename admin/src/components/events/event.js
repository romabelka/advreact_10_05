import React from 'react'

class Event extends React.Component {
    render() {
        const {event: {title, url, when, where}} = this.props
        return (
            <div>
                <h3>{title}</h3>
                <dl>
                    <dt>Url:</dt><dd> {url}</dd>
                    <dt>When:</dt><dd> {when}</dd>
                    <dt>Where:</dt><dd> {where}</dd>
                </dl>
            </div>
        )
    }
}


export default Event