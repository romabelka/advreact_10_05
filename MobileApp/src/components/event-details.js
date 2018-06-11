import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import RemoveEventModal from './remove-event-modal'

class EventDetails extends Component {

  render() {
    const { event } = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: 'https://picsum.photos/500/200/?random'}}
          resizeMode = {Image.resizeMode.contain}
        />
        <Text>title: {event.title}</Text>
        <Text>url: {event.url}</Text>
        <Text>when: {event.when}</Text>
        <Text>where: {event.where}</Text>

        <RemoveEventModal />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingBottom: 30,
  },
  image: {
    width: 400,
    height: 200
  }
});

export default EventDetails;