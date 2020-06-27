import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDTOaGDw0EPvbuaM9uoYodSinigVv2WV-g",
  authDomain: "socl-a9f10.firebaseapp.com",
  databaseURL: "https://socl-a9f10.firebaseio.com",
  projectId: "socl-a9f10",
  storageBucket: "socl-a9f10.appspot.com",
  messagingSenderId: "823423695403",
  appId: "1:823423695403:web:e1c5b21e0236be02f6486e"
}

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAppAuth = firebaseApp.auth();
export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
export const db = firebaseApp.firestore()