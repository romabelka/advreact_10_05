import firebase from 'firebase'

export const appName = 'advanced-react-course'

export const config = {
    apiKey: 'AIzaSyCnmXUzbO2mO8kQXy3ewm34zQCpHNxgc6Q',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "",
    messagingSenderId: "188732377191"
}

firebase.initializeApp(config)