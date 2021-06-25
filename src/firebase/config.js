import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyBBYo4lG-d_bn1r7xpvcY14IG3JOI8L12M',
	authDomain: 'tukutane-wap.firebaseapp.com',
	databaseURL: 'https://tukutane-wap-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'tukutane-wap',
	storageBucket: 'tukutane-wap.appspot.com',
	messagingSenderId: '401337877014',
	appId: '1:401337877014:web:e1261a49f1b20d11a5eb37',
};

/** initialize firebase */
firebase.initializeApp(firebaseConfig);

/** initialize services */
const auth = firebase.auth();
const rtDb = firebase.database();

/** export */
export { auth, rtDb };
