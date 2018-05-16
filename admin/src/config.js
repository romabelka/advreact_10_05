import firebase from 'firebase'
import conf from './conf.json'

export const appName = conf.appName

export const config = {
    apiKey: conf.apiKey,
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "",
    messagingSenderId: conf.messagingSenderId
}

firebase.initializeApp(config)