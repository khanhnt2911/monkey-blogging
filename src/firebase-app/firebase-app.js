import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCD8haxenlJfYD9y8-SFKcfPwVpfsHiuf0",
  authDomain: "monkey-blogging-2e4ec.firebaseapp.com",
  projectId: "monkey-blogging-2e4ec",
  storageBucket: "monkey-blogging-2e4ec.appspot.com",
  messagingSenderId: "359146996732",
  appId: "1:359146996732:web:02ffe21a19997d4b6fe879",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
