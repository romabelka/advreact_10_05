import React, { Component } from 'react'

class ErrorField extends Component {
  static propTypes = {}

  render() {
    const {
      input,
      type,
      label,
      meta: { error, touched }
    } = this.props
    const errorMessage = touched &&
      error && <h3 style={{ color: 'red' }}>{error}</h3>
    return (
      <div>
        {label}
        <input {...input} type={type} />
        {errorMessage}
      </div>
    )
  }
}

export default ErrorField
