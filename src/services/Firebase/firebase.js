import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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
