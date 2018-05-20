import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'react-advanced-nikolay'

export const config = {
  apiKey: 'AIzaSyAAwv7Zb7tJbu5VjbyI6O7kQ06nm4BAiIs',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '806752161129'
}

firebase.initializeApp(config)
