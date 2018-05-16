import firebase from 'firebase/app'

export const appName = 'reactcourses'

export const config = {
    apiKey: "AIzaSyBpWxce2YKP0IQq7VzL5h6NbgwEkOkXuJQ",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "reactcourses.appspot.com",
    messagingSenderId: "800602941807"
};

firebase.initializeApp(config)