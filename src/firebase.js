// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQSYGo0zpeVmqDxHJBpEPmxwv-BsuNYYI",
  authDomain: "invest-in-potential.firebaseapp.com",
  projectId: "invest-in-potential",
  storageBucket: "invest-in-potential.appspot.com",
  messagingSenderId: "1366267460",
  appId: "1:1366267460:web:1a52880dcea559a7de8e11",
  measurementId: "G-QPBNMQTE22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);