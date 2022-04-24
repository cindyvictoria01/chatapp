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

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

export default SignIn;

export { SignOut };
