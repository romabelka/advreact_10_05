import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Camera, Permissions } from 'expo'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

@inject('people')
@inject('navigation')
@observer
class PersonAvatar extends Component {
  @observable permissionAsked = false
  @observable permissionGranted = false

  async componentDidMount() {
    this.setPermissionAsked(true)
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setPermissionGranted(status === 'granted')
  }

  @action setPermissionAsked = (asked) => (this.permissionAsked = asked)
  @action setPermissionGranted = (granted) => (this.permissionGranted = granted)

  render() {
    if (!this.permissionAsked) return <Text>Not Asked</Text>
    if (!this.permissionGranted) return <Text>Not Granted</Text>

    return (
      <View style={styles.container}>
        <Camera style={styles.camera} ref={this.setRef}>
          <View>
            <TouchableOpacity style={styles.button} onPress={this.takeAvatar} />
          </View>
        </Camera>
      </View>
    )
  }

  setRef = (ref) => {
    this.camera = ref
  }

  takeAvatar = async () => {
    const { uid, people, navigation } = this.props

    if (this.camera) {
      const avatar = await this.camera.takePictureAsync({ base64: true })
      people.saveAvatar(uid, avatar)
    }

    navigation.navigate('people')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  button: {
    marginBottom: 20,
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'center'
  }
})

export default PersonAvatar
