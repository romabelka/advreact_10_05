import firebase from 'firebase'

export const appName = process.env.REACT_APP_FIREBASE_APP_NAME
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY
const messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID

export const config = {
    apiKey,
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "",
    messagingSenderId,
}

firebase.initializeApp(config)