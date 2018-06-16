import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Camera, Permissions} from 'expo';

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  static navigationOptions = {
    title: 'camera'
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
              <Text
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  fontSize: 18, marginBottom: 10, color: 'white'
                }}>
                {this.text}
              </Text>
            </View>
          </Camera>
        </View>
      );

    }
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log(photo)
      this.text = photo.height || ''
    }
  };
}