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
    console.log(this.props.navigation)
    return <Person person = {this.props.people.entities[this.props.navigation.state.params.uid]} makePhoto = {this.makePhoto}/>
  }

  makePhoto = () => {
    this.props.navigation.navigate('camera')
  }
}

export default PersonScreen