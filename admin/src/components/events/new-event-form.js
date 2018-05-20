import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/error-field'

export const fieldsConfig = [
  {
    name: 'title',
    type: 'text'
  },
  {
    name: 'url',
    type: 'text'
  },
  {
    name: 'where',
    type: 'text'
  },
  {
    name: 'month',
    type: 'month'
  },
  {
    name: 'when',
    type: 'date'
  },
  {
    name: 'submissionDeadline',
    type: 'date'
  }
]

class NewEventForm extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          {fieldsConfig.map((field, i) => (
            <Field
              key={i}
              name={field.name}
              label={field.name}
              type={field.type}
              component={ErrorField}
            />
          ))}
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    )
  }
}

function validate({ title }) {
  const errors = {}

  if (!title) errors.title = 'title is required'

  return errors
}

export default reduxForm({
  form: 'event',
  validate
})(NewEventForm)
