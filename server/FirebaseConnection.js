const firebase = require("firebase");
// const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyA-ejXatXbptFMHj1UXftnds6R6gBjAvgk",
  authDomain: "chat-app-13b1f.firebaseapp.com",
  projectId: "chat-app-13b1f",
  storageBucket: "chat-app-13b1f.appspot.com",
  messagingSenderId: "145970072242",
  appId: "1:145970072242:web:6e669325882f2d5c6e17ab",
  measurementId: "G-2ZQ3PVRHW3",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const User = db.connection("Users");

module.exports = User;
