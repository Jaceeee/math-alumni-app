import Rebase from 're-base';
import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyC7BWIG4IXBwVvSUcNephbR0EGFgNI2_B4",
    authDomain: "up-math-alumni-website.firebaseapp.com",
    databaseURL: "https://up-math-alumni-website.firebaseio.com",
    projectId: "up-math-alumni-website",
    storageBucket: "up-math-alumni-website.appspot.com",
    messagingSenderId: "328792850548"
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

// const auth = firebase.auth();

export {
	base
};
