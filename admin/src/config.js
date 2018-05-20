import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'adv-react-training'

export const config = {
    apiKey: "AIzaSyCmvhyNT0lpU0qkMlXHzrsNbH3HOTh8f4A",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "547163325073"
}

firebase.initializeApp(config)
