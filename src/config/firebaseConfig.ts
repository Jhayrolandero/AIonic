// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuLLdeG9SAy33Hti9N1MXQV2sz_vOOOwM",
  authDomain: "ainotesummarizer.firebaseapp.com",
  projectId: "ainotesummarizer",
  storageBucket: "ainotesummarizer.firebasestorage.app",
  messagingSenderId: "283036018176",
  appId: "1:283036018176:web:7f177370ebb110a3bb9ae5",
  measurementId: "G-1J8ZN4KGVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// export default{ db };
