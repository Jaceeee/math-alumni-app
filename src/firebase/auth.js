import { auth } from './firebase';

// Sign up
export const doCreateUserWithEmailAndPassword = (username, password) => 
	auth.createUserWithEmailAndPassword(email, password);

// Sign in
export const doSignInWithEmailAndPassword = (username, password) => 
	auth.signInWithEmailAndPassword(email, password);

export const doSignOut = () =>
	auth.signOut();

// Password reset
export const doPasswordReset = (email) => 
	auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) => 
	auth.currentUser.updatePassword(password);