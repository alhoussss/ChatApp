import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getApps } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBlXWmgBsrLnD86ZCdY2MMd8xVoQzgbhZg",
  authDomain: "chatbox-react-8bf83.firebaseapp.com",
  projectId: "chatbox-react-8bf83",
  storageBucket: "chatbox-react-8bf83.appspot.com",
  messagingSenderId: "1048885457143",
  appId: "1:1048885457143:web:ecb9b7f2fd95adce9ce3f2",
  measurementId: "G-8JVVK20CZM"
};

if (!getApps().length) initializeApp(firebaseConfig)

    export {
      getAuth,
      onAuthStateChanged,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      updateProfile,
      signOut,
      collection,
      addDoc,
      getFirestore,
      onSnapshot,
      serverTimestamp,
      query,
      orderBy,
    }