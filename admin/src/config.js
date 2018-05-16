import firebase from 'firebase'

export const appName = 'reactfirstproject-80dc2'

export const config = {
    apiKey: 'AIzaSyBTCfco9DOZ1M1OcWI662uOgYbBCQm5jXQ',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "",
    messagingSenderId: "165794362538"
}

firebase.initializeApp(config)