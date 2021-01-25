import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//TODO: .env file doesn't work

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// });

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBma-7xsUDmj2BnM5VMlO4xGplw0wTHdqI",
  authDomain: "telepaincenter.firebaseapp.com",
  projectId: "telepaincenter",
  storageBucket: "telepaincenter.appspot.com",
  messagingSenderId: "452236176963",
  appId: "1:452236176963:web:295d74ae9f3b2dccd0aef6",
  measurementId: "G-CQKP9F6YMW",
});

export const getRrfProps = (store) => ({
  firebase,
  config: {},
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
});

export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();
export default firebaseApp;
