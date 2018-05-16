import firebase from 'firebase'

export const appName = 'advreact-8046a'

export const config = {
    apiKey: 'AIzaSyDDXueGWilb2t294SfYQfFC24o93KhDuc4',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "",
    messagingSenderId: "1082449474915"
}

firebase.initializeApp(config)