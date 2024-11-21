// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-gymtracker.firebaseapp.com",
  projectId: "mern-gymtracker",
  storageBucket: "mern-gymtracker.firebasestorage.app",
  messagingSenderId: "317433340230",
  appId: "1:317433340230:web:efaa48d53c0a13c64a4547"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);