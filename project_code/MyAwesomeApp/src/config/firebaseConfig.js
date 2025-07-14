// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPB96sOUrIyHuqSALrIqDyCpxmjKM5UvU",
  authDomain: "myawesomeapp-20bd8.firebaseapp.com",
  projectId: "myawesomeapp-20bd8",
  storageBucket: "myawesomeapp-20bd8.firebasestorage.app",
  messagingSenderId: "519696516282",
  appId: "1:519696516282:web:cbd5bd170e60b187dfae83",
  measurementId: "G-WLM8C5PLGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };           
// const analytics = getAnalytics(app);  // WEB ONLY