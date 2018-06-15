import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { MapView, Permissions, Location, Camera } from 'expo'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

@observer
class PersonCam extends Component {
  static navigationOptions = {
    title: 'camera'
  }

  @observable permissionAsked = false
  @observable permissionGranted = false
  @observable coords = null
  @observable type = Camera.Constants.Type.back

  async componentDidMount() {
    this.setPermissionAsked(true)
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setPermissionGranted(status === 'granted')
    Location.getCurrentPositionAsync({ enableHighAccuracy: true }).then(
      (position) => this.setCoords(position)
    )
  }

  @action setPermissionAsked = (asked) => (this.permissionAsked = asked)
  @action setPermissionGranted = (granted) => (this.permissionGranted = granted)
  @action setCoords = ({ coords }) => (this.coords = coords)
  @action
  setType = (type) => {
    this.type === Camera.Constants.Type.back
      ? (this.type = Camera.Constants.Type.front)
      : (this.type = Camera.Constants.Type.back)
  }

  render() {
    if (!this.permissionAsked) return <Text>Not Asked</Text>
    if (!this.permissionGranted) return <Text>Not Granted</Text>
    if (!this.coords) return null
    console.log('---', this.coords)

    return (
      <Camera style={{ flex: 1 }} type={this.type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row'
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
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
        </View>
      </Camera>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default PersonCam
