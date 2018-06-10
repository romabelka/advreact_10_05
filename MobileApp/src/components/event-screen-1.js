import React, {Component} from 'react'
import {View, StyleSheet, Text, ImageBackground, Linking, TouchableOpacity, Button, AlertIOS} from 'react-native'

class EventScreen extends Component {
  static propTypes = {};

  render() {
    const {title, url, when, where, uid} = this.props.event
    return (
      <View key={uid} style={styles.container}>
        <TouchableOpacity
          onPress={() => Linking.openURL(url)}>
          <ImageBackground source={{uri: 'https://placeimg.com/350/700/tech'}}
                           style={styles.image}
          >
            <View style={styles.text}/>
            <Text style={styles.title}>
              {title.toUpperCase()}
            </Text>
            <Text style={styles.paragraph}>
              {when}
            </Text>
            <Text style={styles.paragraph}>
              {where}
            </Text>
            <Button
              style={styles.paragraph}
              title = "Delete Event"
              onPress = {() => AlertIOS.alert(
                'Delete event',
                'Are you sure you want to delete this event?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: () => console.log('Delete Pressed'),
                    style: 'destructive'
                  },
                ]
              )}
            />
          </ImageBackground>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: 700,
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    textAlign: 'left',
    margin: 5,
    fontSize: 20,
    color: '#fff',
    fontFamily: 'HelveticaNeue-Thin'
  },
  title: {
    textAlign: 'left',
    margin: 5,
    fontSize: 20,
    color: '#fff',
    fontFamily: 'HelveticaNeue-Light'
  },
  text: {
    backgroundColor: '#000',
    opacity: .5,
    width: 350,
    height: 200,
    position: 'absolute'

  }
});

export default EventScreen