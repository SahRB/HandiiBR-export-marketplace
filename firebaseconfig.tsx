// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS0uWMU7R5VZsbwdoqhiGoUG9xRbo5iH4",
  authDomain: "app-exportacao-reactnative.firebaseapp.com",
  projectId: "app-exportacao-reactnative",
  storageBucket: "app-exportacao-reactnative.appspot.com",
  messagingSenderId: "414879942793",
  appId: "1:414879942793:web:a4b627d5ffacea3d461e58",
  measurementId: "G-1JPWWM4J7T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);