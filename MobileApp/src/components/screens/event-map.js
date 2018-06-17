import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { MapView, Permissions, Location } from 'expo'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

@observer
class EventMap extends Component {
  static navigationOptions = {
    title: 'map'
  }

  @observable permissionAsked = false
  @observable permissionGranted = false
  @observable coords = null

  async componentDidMount() {
    this.setPermissionAsked(true)
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    this.setPermissionGranted(status === 'granted')
    Location.getCurrentPositionAsync({ enableHighAccuracy: true }).then(
      (position) => this.setCoords(position)
    )
  }

  @action setPermissionAsked = (asked) => (this.permissionAsked = asked)
  @action setPermissionGranted = (granted) => (this.permissionGranted = granted)
  @action setCoords = ({ coords }) => (this.coords = coords)

  render() {
    if (!this.permissionAsked) return <Text>Not Asked</Text>
    if (!this.permissionGranted) return <Text>Not Granted</Text>
    if (!this.coords) return null
    console.log('---', this.coords)

    return (
      <MapView
        style={styles.container}
        initialRegion={{
          ...this.coords,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <MapView.Marker coordinate={{ ...this.coords }} />
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default EventMap
