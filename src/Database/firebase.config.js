import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFe1UMs8SVsr4j5BPU63xw0I3pzgwloGE",
  authDomain: "alpaha-omega.firebaseapp.com",
  projectId: "alpaha-omega",
  storageBucket: "alpaha-omega.firebasestorage.app",
  messagingSenderId: "686440883297",
  appId: "1:686440883297:web:451af4cb3c2cea1a7bf620",
};

// ১. Firebase App ইনিশিয়ালাইজ করা
const app = initializeApp(firebaseConfig);

// ২. সার্ভিসগুলো আলাদাভাবে এক্সপোর্ট করা
export const auth = getAuth(app); // লগইন/সাইনআপের জন্য
export const db = getFirestore(app); // ডাটা সেভ করার জন্য (Firestore)

export default app;
