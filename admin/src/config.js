import firebase from 'firebase'

export const appName = 'advreact-10-05'

export const config = {
    apiKey: "AIzaSyDWvFgXNnRODlSufinZ2TCMwX3RPhrLlTg",
    authDomain: `${appName}-1feca.firebaseapp.com`,
    databaseURL: `https://${appName}-1feca.firebaseio.com`,
    projectId: `${appName}-1feca`,
    storageBucket: "",
    messagingSenderId: "619137308770"
}

firebase.initializeApp(config)