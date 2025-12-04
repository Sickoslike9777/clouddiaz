import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👇 Импортируем Firestore

// Твои настройки (оставь свои ключи)
const firebaseConfig = {
  apiKey: "AIzaSyAaKUTdQAiEBxTkWXSNcNcnYroOzzrqjM4",
  authDomain: "cloud-diaz.firebaseapp.com",
  projectId: "cloud-diaz",
  storageBucket: "cloud-diaz.firebasestorage.app",
  messagingSenderId: "361977731918",
  appId: "1:361977731918:web:4ccef17f38158506315c1f",
  measurementId: "G-NP5EPCP88W"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // 👇 Экспортируем базу данных