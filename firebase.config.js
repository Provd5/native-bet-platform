import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const authDomain = process.env.EXPO_PUBLIC_AUTH_DOMAIN;
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID;
const storageBucket = process.env.EXPO_PUBLIC_STORAGE_BUCKET;
const messagingSenderId = process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID;
const appId = process.env.EXPO_PUBLIC_APP_ID;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const store = getFirestore(app);
export const db = getDatabase(app);
