import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFunctions, type Functions } from "firebase/functions";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import {
  getFirestore,
  initializeFirestore,
  type Firestore,
  type FirestoreSettings,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const requiredFirebaseConfig = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  appId: firebaseConfig.appId,
};

export const hasFirebaseConfig = Object.values(requiredFirebaseConfig).every(Boolean);
console.log("🔥 hasFirebaseConfig:", hasFirebaseConfig);
console.log("🔥 firebaseConfig:", firebaseConfig);
const missingConfigMessage =
  "Missing Firebase configuration. Set NEXT_PUBLIC_FIREBASE_* environment variables.";
let hasWarnedMissingConfig = false;
let firestoreInstance: Firestore | null = null;
const firestoreSettings = {
  experimentalForceLongPolling: true,
} satisfies FirestoreSettings;

const warnMissingConfig = () => {
  if (hasWarnedMissingConfig) return;
  hasWarnedMissingConfig = true;
  console.warn(missingConfigMessage);
};

const getFirebaseApp = (): FirebaseApp | null => {
  if (!hasFirebaseConfig) {
    if (typeof window === "undefined") {
      throw new Error(missingConfigMessage);
    }
    warnMissingConfig();
    return null;
  }

  return getApps().length ? getApp() : initializeApp(firebaseConfig);
};

export const getFirebaseAuth = (): Auth | null => {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
};

export const getFirestoreDb = (): Firestore | null => {
  const app = getFirebaseApp();
  if (!app) return null;
  try {
    return getFirestore(app);
  } catch (error) {
    console.warn("Firestore not initialized, falling back to long polling.", error);
  }

  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("[Firestore] Using long polling");
  }

  return initializeFirestore(app, {
    ...firestoreSettings,
  });
};

export const getFirebaseStorage = (): FirebaseStorage | null => {
  const app = getFirebaseApp();
  if (!app) return null;
  return getStorage(app);
};

export const getFirebaseFunctions = (): Functions | null => {
  const app = getFirebaseApp();
  if (!app) return null;
  return getFunctions(app);
};

export const requireFirestoreDb = (): Firestore => {
  const db = getFirestoreDb();
  if (!db) {
    throw new Error(missingConfigMessage);
  }
  return db;
};
