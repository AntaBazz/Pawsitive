// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDZ8I6LscGUW7Cnpp2vz39mm9mvxE-EcP8",
  authDomain: "pawsitive-750fc.firebaseapp.com",
  projectId: "pawsitive-750fc",
  storageBucket: "pawsitive-750fc.appspot.com",
  messagingSenderId: "770470274035",
  appId: "1:770470274035:web:8a48d6f1fe59f8ad0e6886",
  measurementId: "G-W8T6MK8DWG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db, analytics };
