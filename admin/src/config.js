import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'advancedreact-f31cd'

export const config = {
  apiKey: 'AIzaSyC4HchzzCItq1dPJRY_B-InXmnkIasqMVw',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: '',
  messagingSenderId: '71475877514'
}

firebase.initializeApp(config)
