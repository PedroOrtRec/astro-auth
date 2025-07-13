// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkT4cnXPpMRzct6TdVHZ3mwUFaDVg34z0",
  authDomain: "astro-auth-2ec5f.firebaseapp.com",
  projectId: "astro-auth-2ec5f",
  storageBucket: "astro-auth-2ec5f.firebasestorage.app",
  messagingSenderId: "1061428415595",
  appId: "1:1061428415595:web:a82650168b1c86cca9352e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// auth.languageCode = 'es'

export const firebase = {
    app,
    auth,
}