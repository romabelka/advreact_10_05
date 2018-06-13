import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PeopleList from '../people/people-list'
import Loader from '../common/loader'

@inject('people')
@observer
class PeopleListScreen extends Component {
  componentDidMount() {
    if (!this.props.people.loading && !this.props.people.loaded) {
      this.props.people.fetchAll()
    }
  }

  render() {
    if (this.props.people.loading) {
      return <Loader />
    }

    return <PeopleList people={this.props.people.entities} />
  }
}

export default PeopleListScreen
