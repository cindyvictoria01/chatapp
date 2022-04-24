import React from "react";
import send from "../images/send.png";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useCollectionData } from "react-firebase-hooks/firestore";

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
const firestore = firebase.firestore();

function ChatRoom() {
  const dummy = React.useRef();

  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = React.useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" disabled={!formValue}>
          <img className="icon" src={send} alt="send"></img>
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "recieved";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="profile" />
      <p>{text}</p>
    </div>
  );
}

export default ChatRoom;
