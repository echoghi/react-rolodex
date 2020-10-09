import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
    apiKey: process.env.FIREBASEKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET
};

class Firebase {
    constructor() {
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.db = firebase.database();
        this.googleProvider = new firebase.auth.GoogleAuthProvider();
        this.fbProvider = new firebase.auth.FacebookAuthProvider();
        this.emailProvider = new firebase.auth.EmailAuthProvider();
    }

    logIn(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logInWithCredential(credential) {
        return this.auth.signInWithCredential(credential);
    }

    logInWithGoogle() {
        return this.auth.signInWithPopup(this.googleProvider);
    }

    logInWithFacebook() {
        return this.auth.signInWithPopup(this.fbProvider);
    }

    logOut() {
        return this.auth.signOut();
    }

    resetPasswordRequest(email) {
        return this.auth.sendPasswordResetEmail(email);
    }

    async register(name, email, password) {
        // create new user
        await this.auth.createUserWithEmailAndPassword(email, password);

        // save name
        return this.auth.currentUser.updateProfile({
            displayName: name,
            photoURL: this.auth.currentUser.photoURL
        });
    }
}

export default new Firebase();
