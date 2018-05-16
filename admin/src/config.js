import firebase from 'firebase'

export const appName = 'advreact-10-05'

export const config = {
	apiKey: 'AIzaSyA9z4Xmknc0zIAIfvWCfe4XWwhwqiTO9h0',
	authDomain: `${appName}.firebaseapp.com`,
	databaseURL: `https://${appName}.firebaseio.com`,
	projectId: appName,
	storageBucket: '',
	messagingSenderId: '963790431937'
}

firebase.initializeApp(config)
