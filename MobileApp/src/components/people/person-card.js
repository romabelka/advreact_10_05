import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native'
import Card from '../common/card'
import firebase from 'firebase/app'
import {config} from '../../config'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

@observer
class PersonCard extends Component {
  static propTypes = {};

  @observable loading = false
  @observable loaded = false
  @observable avatarURL = null

  async componentDidMount() {
    this.setLoading(true)
    await this.getAvatar(this.props.person)
  }

  @action setAvatar = (url) => this.avatarURL = url
  @action setLoading = loading => this.loading = loading
  @action setLoaded = loaded => this.loaded = loaded

  render() {
    const {email, firstName, lastName} = this.props.person
    const avatar = <Image source={{uri: this.avatarURL}} style={styles.avatar}/>
    const loader = <View style={styles.avatar}><ActivityIndicator size="large"/></View>

    return (
      <Card style={styles.container}>
          {this.loading || !this.loaded || !this.avatarURL ? loader : avatar}
        <View style={styles.content}>
          <Text style={styles.email}>{email}</Text>
          <Text>{firstName} {lastName}</Text>
        </View>
      </Card>
    )
  }

  getAvatar = async ({uid, avatar}) => {
    if (!avatar) {
      await this.setAvatar('https://picsum.photos/200/100/?random')
    } else {
      await firebase.storage()
        .refFromURL(`gs://${config.storageBucket}/avatars/${uid}/${avatar}`)
        .getDownloadURL()
        .then(url => this.setAvatar(url))
    }

    this.setLoading(false)
    this.setLoaded(true)

  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  avatar: {
    width: 200,
    height: 100,
    margin: 5,
    justifyContent: 'center',

  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  email: {
    fontWeight: 'bold'
  }
})


export default PersonCard