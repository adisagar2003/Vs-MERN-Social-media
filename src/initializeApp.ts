import { initializeApp } from "firebase/app";

// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAl29OwR_PF4_0B9yTUcsIUqYIpV7TaNDg",

  authDomain: "vatty-assets.firebaseapp.com",

  databaseURL: "https://vatty-assets-default-rtdb.firebaseio.com",

  projectId: "vatty-assets",

  storageBucket: "vatty-assets.appspot.com",

  messagingSenderId: "21776857296",

  appId: "1:21776857296:web:f10f640c5025317c3fc6d5",

  measurementId: "G-7YRXB9H8NW",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
