// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import firebaseConfig from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
// const analytics = getAnalytics(app);

// Data stored in documents, which are stored in collections
const firebaseDB = getFirestore(firebaseApp);

export { firebaseApp, firebaseAuth, firebaseDB };
