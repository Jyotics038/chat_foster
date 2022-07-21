// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp7uT33uFChpcH0GhMD1su8GOHnMCeOng",
  authDomain: "chat-app-5b1be.firebaseapp.com",
  projectId: "chat-app-5b1be",
  storageBucket: "chat-app-5b1be.appspot.com",
  messagingSenderId: "361823625755",
  appId: "1:361823625755:web:b12a40c6a1a71b454b4ebe",
  measurementId: "G-RW4SFJGF0L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore();

export {auth,db};