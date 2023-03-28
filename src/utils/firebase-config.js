// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB5mOhePo09f38kE05SmPd7p8rYhjY4tQI",
  authDomain: "chill-flim.firebaseapp.com",
  projectId: "chill-flim",
  storageBucket: "chill-flim.appspot.com",
  messagingSenderId: "568384470850",
  appId: "1:568384470850:web:90b7612bcc2be731b192db",
  measurementId: "G-CFW1MD8PWK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
