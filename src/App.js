import React from "react";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/SignIn";
import { SignOut } from "./components/SignIn";

import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

firebase.initializeApp({
  apiKey: "AIzaSyBoxCztI4e2lIaALyynkZrs82v0esfNwSs",
  authDomain: "uas-chattingapp.firebaseapp.com",
  databaseURL:
    "https://uas-chattingapp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "uas-chattingapp",
  storageBucket: "uas-chattingapp.appspot.com",
  messagingSenderId: "1093220063359",
  appId: "1:1093220063359:web:35cd7c0f4292bb6055874a",
  measurementId: "G-V2DL4EJE7E",
});

const auth = firebase.auth();
function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat Room</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

export default App;
