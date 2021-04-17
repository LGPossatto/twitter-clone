import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase";

import UserState from "./context/user/userState";

var firebaseConfig = {
  apiKey: "AIzaSyB8yLiHy0KPTtreHwFmH1Z1RWcKkGDmoM8",
  authDomain: "twitter-clone-29260.firebaseapp.com",
  projectId: "twitter-clone-29260",
  storageBucket: "twitter-clone-29260.appspot.com",
  messagingSenderId: "682483840458",
  appId: "1:682483840458:web:095e20f9b5d9584f280b33",
  measurementId: "G-Y332HG4NZP",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <UserState>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UserState>,
  document.getElementById("root")
);
