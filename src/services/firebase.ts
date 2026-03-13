import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqUAHB3xQr7MSeFSrakoMiYjOdQ8fht18",
  authDomain: "spotnum-7435a.firebaseapp.com",
  projectId: "spotnum-7435a",
  storageBucket: "spotnum-7435a.firebasestorage.app",
  messagingSenderId: "769855710226",
  appId: "1:769855710226:web:45ffb516fbdd797abe24cb",
  measurementId: "G-CDBJDYZNW0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);