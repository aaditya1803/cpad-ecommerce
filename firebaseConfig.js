// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5LYrkR3NDoGzrv2JMD---1ArSmaCGBBI",
  authDomain: "cpad-ecommerce.firebaseapp.com",
  projectId: "cpad-ecommerce",
  storageBucket: "cpad-ecommerce.appspot.com",
  messagingSenderId: "598844869876",
  appId: "1:598844869876:web:652cc55035fa5ac30a62a1",
  measurementId: "G-HZFQCC03PW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);