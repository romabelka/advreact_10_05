import firebase from 'firebase'

export const appName = 'advreact-10-05'

export const config = {
    apiKey: 'AIzaSyCbMQM0eQUSQ0SuLVAu9ZNPUcm4rdbiB8U',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "",
    messagingSenderId: "1094825197832"
}

firebase.initializeApp(config)