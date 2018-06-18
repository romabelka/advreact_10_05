import React from 'react';
import {Text, View, TouchableOpacity, StatusBar} from 'react-native';
import {Camera, Permissions} from 'expo';
import firebase from 'firebase/app'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'


@inject('people')
@observer
export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
  };

  static navigationOptions = {
    tabBarVisible: false,
    header: null,
    title: null
  }

  async componentWillMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  render() {
    const {hasCameraPermission} = this.state;
    if (hasCameraPermission === null) {
      return <View/>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{flex: 1}}>
          <StatusBar
            hidden
          />
          <Camera style={{flex: 1}} type={this.state.type}
                  ref={ref => {
                    this.camera = ref;
                  }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                  {' '}Cancel{' '}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.snap}
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                  {' '}Snapshot{' '}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>

{/*              <Text
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  fontSize: 18, marginBottom: 10, color: 'white'
                }}>
                {this.text}
              </Text>*/}
            </View>
          </Camera>
        </View>
      );

    }
  }

  snap = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      const { uid } = this.props.navigation.state.params
      this.props.people.saveAvatar(uid, photo)
      this.props.navigation.goBack()
    }
  };
}