import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react'
import PeopleList from '../people/people-list'
import Loader from '../common/loader'

@inject('people')
@observer
class PeopleListScreen extends Component {
  static propTypes = {}

  componentDidMount() {
    if (!this.props.people.loading && !this.props.people.loaded) {
      this.props.people.getAllPeople()
    }
  }

  render() {
    if (this.props.people.loading) {
      return <Loader />
    }
    return (
      <View>
        <Text style={styles.header}>People list</Text>
        <PeopleList people={this.props.people.entities} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    padding: 20
  }
})

export default PeopleListScreen
