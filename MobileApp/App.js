import React from 'react';
import {StyleSheet, View, Image, NavigatorIOS} from 'react-native';
import SignIn from './src/components/sign-in'
//import HelloWorld from './src/hello-world'
import EventList from './src/components/event-list'
import fixtures from './fixtures.json'
import img from './assets/images/logo.png'
import EventScreen from './src/components/event-screen-1'

const events = Object.entries(fixtures.events).map(([uid, event]) => ({...event, uid}))

/*export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          component: EventList,
          title: 'My Initial Scene',
          passProps: {events}
        }}/>

    );
  }
}*/

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <EventList events = {events}/>
        {/*<EventScreen event = {events[0]}/>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  image: {
    width: '100%',
    height: 100
  }
});

