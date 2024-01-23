// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-auth-b9a3a.firebaseapp.com",
  projectId: "mern-auth-b9a3a",
  storageBucket: "mern-auth-b9a3a.appspot.com",
  messagingSenderId: "517544155288",
  appId: "1:517544155288:web:7e77442ac75fdd0e4418ed"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);