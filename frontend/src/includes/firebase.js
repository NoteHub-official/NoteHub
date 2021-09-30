import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCE8H066cgN969UuRrI02FxMYlwCK1TWQg",
  authDomain: "notehub-326303.firebaseapp.com",
  projectId: "notehub-326303",
  storageBucket: "notehub-326303.appspot.com",
  messagingSenderId: "121246877159",
  appId: "1:121246877159:web:70bf417836e3c18f2f2942",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

export { app, auth, db, storage, ref };
