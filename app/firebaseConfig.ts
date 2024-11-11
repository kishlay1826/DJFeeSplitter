import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBHO4qeyX3vkC0K8vP0M9SPJ0ude6uB46s",
    authDomain: "goodj-943d4.firebaseapp.com",
    projectId: "goodj-943d4",
    storageBucket: "goodj-943d4.firebasestorage.app",
    messagingSenderId: "1082315432953",
    appId: "1:1082315432953:web:ec3222fadb8e76bb90d328",
    measurementId: "G-SNLHMQMRHC"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
