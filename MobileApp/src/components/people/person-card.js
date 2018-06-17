import React, {Component} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import Card from '../common/card'
import firebase from 'firebase/app'

class PersonCard extends Component {
  static propTypes = {};


  componentDidMount() {
    this.getAvatar(this.props.person)
  }

  render() {
    const {email, firstName, lastName, avatar, uid} = this.props.person
    return (
      <Card style={styles.container}>
        <Image source={{uri: 'https://picsum.photos/200/100/?random'}} style={styles.avatar}/>
        <View style={styles.content}>
          <Text style={styles.email}>{email}</Text>
          <Text>{firstName} {lastName}</Text>
        </View>
      </Card>
    )
  }

  getAvatar = ({uid, avatar}) => {
    if (!avatar) return

    firebase.storage()
      .refFromURL(`gs://advancedreactcourse.appspot.com/avatars/${uid}/${avatar}`)
      .getDownloadURL()
      .then(console.log);

  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  avatar: {
    width: 200,
    height: 100,
    margin: 5
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  email: {
    fontWeight: 'bold'
  }
})

export default PersonCard