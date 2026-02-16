import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAj4XIlroSrDEu9tvdYxC_FPJlZQwh7Y00",
  authDomain: "thgear-b6106.firebaseapp.com",
  projectId: "thgear-b6106",
  storageBucket: "thgear-b6106.firebasestorage.app",
  messagingSenderId: "961605571899",
  appId: "1:961605571899:web:51748bcee665e42a78931e",
  measurementId: "G-LV307HR83P",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
