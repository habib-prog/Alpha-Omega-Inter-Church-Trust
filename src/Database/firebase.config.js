import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASA3pOCHe5Y3nkw5XwsoPPN4cg6K15-vM",
  authDomain: "alpha-omega-trust.firebaseapp.com",
  databaseURL: "https://alpha-omega-trust-default-rtdb.firebaseio.com",
  projectId: "alpha-omega-trust",
  storageBucket: "alpha-omega-trust.firebasestorage.app",
  messagingSenderId: "1075031776025",
  appId: "1:1075031776025:web:d35cd8ecf136589ac08388",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
