import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzB-gd3bdpgUveeVOUR8FzHE5vhQeByow",
  authDomain: "simple-web-backend.firebaseapp.com",
  projectId: "simple-web-backend",
  storageBucket: "simple-web-backend.appspot.com",
  messagingSenderId: "92339817729",
  appId: "1:92339817729:web:299bb7d5723d0b530b9f00",
  measurementId: "G-6N44BXXFYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc };
