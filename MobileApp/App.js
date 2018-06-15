import {configure} from 'mobx'
import {Provider} from 'mobx-react'

configure({enforceActions: true})

import React from 'react';
import {StyleSheet} from 'react-native';
import fixtures from './fixtures.json'
import AppNavigator from './src/components/app-navigator'
import stores from './src/stores'


const events = Object.entries(fixtures.events).map(([uid, event]) => ({...event, uid}))

export default class App extends React.Component {
    render() {
        return <Provider {...stores}>
            <AppNavigator ref={this.setNavRef}/>
        </Provider>
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

