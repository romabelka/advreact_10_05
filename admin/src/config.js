import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'advancedreactcourse'

export const config = {
  apiKey: 'AIzaSyCCtMGA9FTNVds_QTkB1oRTlqF2u07MHuk',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '649150663252'
}

firebase.initializeApp(config)
