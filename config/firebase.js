import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "cliptic---ai-short-vedio-gen.firebaseapp.com",
  projectId: "cliptic---ai-short-vedio-gen",
  storageBucket: "cliptic---ai-short-vedio-gen.firebasestorage.app",
  messagingSenderId: "1036579440320",
  appId: "1:1036579440320:web:5e531910ef41bed92c4f25",
  measurementId: "G-4160PTR2QF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
