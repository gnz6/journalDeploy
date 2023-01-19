// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const FirebaseConfig = {
    apiKey: "AIzaSyD7NH7PGQHFDYWpUly5MlhLW1ToORQ9oIk",
    authDomain: "journal-c3fdc.firebaseapp.com",
    projectId: "journal-c3fdc",
    storageBucket: "journal-c3fdc.appspot.com",
    messagingSenderId: "348639774030",
    appId: "1:348639774030:web:4dd124fb1b5ed571ba0a1f"
};

// Initialize Firebase
export const FireBaseApp = initializeApp(FirebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp)
export const FireBaseDB = getFirestore(FireBaseApp)