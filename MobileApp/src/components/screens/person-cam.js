import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Permissions, Camera } from 'expo'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import firebase from 'firebase/app'
import { decode } from 'base64-arraybuffer'

@observer
class PersonCam extends Component {
  static navigationOptions = {
    title: 'camera'
  }

  camera = null

  @observable permissionAsked = false
  @observable permissionGranted = false
  @observable type = Camera.Constants.Type.back

  async componentDidMount() {
    this.setPermissionAsked(true)
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setPermissionGranted(status === 'granted')
  }

  @action setPermissionAsked = (asked) => (this.permissionAsked = asked)
  @action setPermissionGranted = (granted) => (this.permissionGranted = granted)

  @action
  setType = (type) => {
    this.type === Camera.Constants.Type.back
      ? (this.type = Camera.Constants.Type.front)
      : (this.type = Camera.Constants.Type.back)
  }

  render() {
    if (!this.permissionAsked) return <Text>Not Asked</Text>
    if (!this.permissionGranted) return <Text>Not Granted</Text>

    return (
      <Camera
        style={{ flex: 1 }}
        ratio="16:9"
        autoFocus={false}
        type={this.type}
        ref={(ref) => {
          this.camera = ref
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row'
          }}
        >
          <TouchableOpacity
            style={{
              // flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center'
            }}
            onPress={() => this.setType()}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              {' '}
              Flip{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center'
            }}
            onPress={this.takePicture}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              {' '}
              Photo{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    )
  }

  getUrl = async ({ base64, uri }) => {
    const name = uri.match(/[ \w-]+?(?=\.).jpg/gm)
    console.log(name[0])
    const storageRef = firebase
      .storage()
      .refFromURL('gs://advreact-10-05-ee9f5.appspot.com')
      .child(name[0])

    await storageRef.put(decode(base64))
    const avatar = await storageRef.getDownloadURL()
  }

  takePicture = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync({ base64: true })
      this.getUrl(photo)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default PersonCam
