import firebase from 'firebase'

export const appName = 'advreact-js'

export const config = {
    apiKey: 'AIzaSyBCNW1bUz_eZtgesn-XnyzowL6Iy-6YOsQ',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "",
    messagingSenderId: "203115896556"
}

firebase.initializeApp(config)