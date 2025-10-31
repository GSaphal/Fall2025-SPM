// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMC0CTnP9eGmJy1C8IpOQrx5Nf6Rkoiyk",
  authDomain: "conu-b18ab.firebaseapp.com",
  projectId: "conu-b18ab",
  storageBucket: "conu-b18ab.firebasestorage.app",
  messagingSenderId: "554730735025",
  appId: "1:554730735025:web:2e2b90474127cc587a2990",
  measurementId: "G-CJLXL3DBR9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  signOut,
};
