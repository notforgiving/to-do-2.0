import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore
} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBD2Bd_eENsWNHTWz0J8i5g5wFjiAGzkCM",
  authDomain: "todo20-8dfa8.firebaseapp.com",
  projectId: "todo20-8dfa8",
  storageBucket: "todo20-8dfa8.appspot.com",
  messagingSenderId: "769645155792",
  appId: "1:769645155792:web:cf4cf0bef5bd4b191f55d5"
};

initializeApp(firebaseConfig);

export const auth = getAuth();

export const register = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

export const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const db = getFirestore();