import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

export const appName = 'advreact-10-05-ee9f5'

export const config = {
  apiKey: 'AIzaSyA9z4Xmknc0zIAIfvWCfe4XWwhwqiTO9h0',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: '',
  messagingSenderId: '963790431937'
}

firebase.initializeApp(config)
