// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoSldJ8kQBFjwXOeTlsOWJLcYYcp8x-2c",
  authDomain: "rick-and-morty-api-ui.firebaseapp.com",
  projectId: "rick-and-morty-api-ui",
  storageBucket: "rick-and-morty-api-ui.appspot.com",
  messagingSenderId: "816104224107",
  appId: "1:816104224107:web:74f346271fd80b91b3c82e",
  measurementId: "G-GZMJJNEBVX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth };
