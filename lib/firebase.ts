import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA-YxITfCxsauX0QhsqBN0d3xdUoYPFBvI",
  authDomain: "dz-tattoo.firebaseapp.com",
  projectId: "dz-tattoo",
  storageBucket: "dz-tattoo.firebasestorage.app",
  messagingSenderId: "975904429163",
  appId: "1:975904429163:web:45d8977540f264f0748d2e",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
