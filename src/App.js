import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyBzB-gd3bdpgUveeVOUR8FzHE5vhQeByow",
  authDomain: "simple-web-backend.firebaseapp.com",
  projectId: "simple-web-backend",
  storageBucket: "simple-web-backend.appspot.com",
  messagingSenderId: "92339817729",
  appId: "1:92339817729:web:299bb7d5723d0b530b9f00",
  measurementId: "G-6N44BXXFYR"
};

initializeApp(firebaseConfig);
const db = getFirestore();

const App = () => {
  const [h1Text, setH1Text] = useState('');
  const [newText, setNewText] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchH1Text = async () => {
      try {
        const docRef = doc(db, 'settings', 'h1Text');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setH1Text(docSnap.data().text);
        } else {
          setH1Text('Default H1 Text');
        }
      } catch (error) {
        console.error('Error fetching H1 text:', error);
      }
    };

    fetchH1Text();
  }, []);

  const handleUpdateText = async () => {
    if(newText == ''){
      alert("Please enter some text");
      return;
    }
    try {
      const docRef = doc(db, 'settings', 'h1Text');
      await setDoc(docRef, { text: newText });
      setH1Text(newText);
      setNewText('');
    } catch (error) {
      console.error('Error updating H1 text:', error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Current H1 - {h1Text}</h1>
      </header>
      {isAdmin && (
        <div>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="New H1 text"
            className="input"
          />
          <button onClick={handleUpdateText} className="button">Update H1 Text</button>
        </div>
      )}
      <button onClick={() => setIsAdmin(!isAdmin)} className={`button ${isAdmin ? 'button-admin' : 'button-user'}`}>
        {isAdmin ? 'Switch to User View' : 'Switch to Admin View'}
      </button>
      <p className="info-text">
        The H1 text is stored and managed in Firebase Firestore. You can update the text from the admin panel, and the changes will be reflected in real-time across all users.
      </p>
    </div>
  );
};

export default App;
