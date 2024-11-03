// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCASwDxKCB8sOgXXPGpw5oN1BpFp5sNYMc",
  authDomain: "sprint1-73887.firebaseapp.com",
  projectId: "sprint1-73887",
  storageBucket: "sprint1-73887.firebasestorage.app",
  messagingSenderId: "553257697382",
  appId: "1:553257697382:web:50451b7ea59d3ab1396da7"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;