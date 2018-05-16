import firebase from 'firebase'

export const appName = 'advanced-react-kirsanov'

export const config = {
    apiKey: 'AIzaSyDNbg_2aVukGbyBRRASfTp5TMRUfrbnfqk',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "",
    messagingSenderId: "132266613304"
}

firebase.initializeApp(config)