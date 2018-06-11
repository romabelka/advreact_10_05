import {configure} from 'mobx'

configure({enforceActions: true})

import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
//import SignIn from './src/components/sign-in'
//import HelloWorld from './src/hello-world'
import EventList from './src/components/events/event-list'
import EventScreen from './src/components/events/event-screen'
import fixtures from './fixtures.json'
import img from './assets/images/logo.png'
import AppNavigator from './src/components/app-navigator'
import stores from './src/stores'


const events = Object.entries(fixtures.events).map(([uid, event]) => ({...event, uid}))

export default class App extends React.Component {
    render() {
        return <AppNavigator ref={this.setNavRef}/>
    }

    setNavRef = (ref) => {
        stores.navigation.setRef(ref)
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

