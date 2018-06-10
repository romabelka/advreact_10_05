import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
//import SignIn from './src/components/sign-in'
//import HelloWorld from './src/hello-world'
import EventList from './src/components/event-list'
import fixtures from './fixtures.json'
import img from './assets/images/logo.png'


const events = Object.entries(fixtures.events).map(([uid, event]) => ({...event, uid}))

const groupedEvents = Object.entries(fixtures.events).reduce( (acc, [uid, event]) => {
  console.log(event);
  const firstChar = event.title[0].toLowerCase();
  if(firstChar in acc) {
    acc[firstChar].push({...event, uid})
  } else {
    acc[firstChar] = [{...event, uid}]
  }

  return acc;
},{});

const sections = Object.entries(groupedEvents).map( ([firstChar, eventsArray]) => {
  return {
    title: firstChar,
    data: eventsArray,
  }
});

const sortingFn = (a, b) => {
  if(a.title < b.title) return -1
  if(a.title > b.title) return 1
  return 0;
}

const sortedSections = sections.sort(sortingFn)


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Image style = {styles.image}
                 source = {img}
                 resizeMode = {Image.resizeMode.contain}
          />
          <EventList events = {events} sections={sortedSections}/>
      </View>
    );
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

