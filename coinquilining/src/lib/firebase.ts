// Import the functions you need from the SDKs you need
import { error } from '@sveltejs/kit';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { writable } from 'svelte/store';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeIlWFhyuFiIrzpK53EyV-Bl3BZE6XcgA",
  authDomain: "coinquilining.firebaseapp.com",
  projectId: "coinquilining",
  storageBucket: "coinquilining.appspot.com",
  messagingSenderId: "768087918819",
  appId: "1:768087918819:web:8b49b18726d18ba06addd6",
  measurementId: "G-2Q96KGP1W2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp)

export { firebaseApp, firebaseAuth }

export let authStore = writable(false);

export function userSignOut() {
  return signOut(firebaseAuth).then(() => {
    return true;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  })
}

onAuthStateChanged(firebaseAuth, async (user) => {
  if (user) {
    authStore.set(true);
    console.log("Logged in ", user);
  } else {
    authStore.set(false);
    console.log("Logged out");
  }
});