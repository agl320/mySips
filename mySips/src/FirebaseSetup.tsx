// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpPIK15GAm-vKBhp5IseKuNABEPls7CCw",
  authDomain: "mysips-c8852.firebaseapp.com",
  projectId: "mysips-c8852",
  storageBucket: "mysips-c8852.appspot.com",
  messagingSenderId: "1060719335158",
  appId: "1:1060719335158:web:24e65b496bd7c59d99bed7",
  measurementId: "G-J19KQBFM2L",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseApp;
