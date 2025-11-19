import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDP1vj9IUx6Wce4rc0fKvs1NliMLfnoujI",
  authDomain: "matchia-96475.firebaseapp.com",
  projectId: "matchia-96475",
  storageBucket: "matchia-96475.firebasestorage.app",
  messagingSenderId: "637154917426",
  appId: "1:637154917426:web:d199a5df487edf6339102b",
  measurementId: "G-DS52LZK709",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
