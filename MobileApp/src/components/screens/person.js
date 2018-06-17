import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import Person from '../people/person'

@inject('people') @observer
class PersonScreen extends Component {
  static propTypes = {

  };

  static navigationOptions = {
    title: 'person'
  }

  render() {
    return <Person person = {this.props.people.entities[this.props.navigation.state.params.uid]} makePhoto = {this.makePhoto}/>
  }

  makePhoto = ({uid}) => {
    this.props.navigation.navigate('camera', { uid })
  }
}

export default PersonScreen