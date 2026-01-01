import { getApp, getApps, initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let firebaseApp: FirebaseApp | undefined;

const hasRequiredClientConfig = () => Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);

export function getFirebaseApp(): FirebaseApp {
    if (!firebaseApp) {
        if (!hasRequiredClientConfig()) {
            // In dev, we might tolerate missing config if we are just testing UI, but really we need it.
            // We'll log a warning instead of throwing to prevent crashing the entire editor if envs are missing 
            // but try-catch in callers should handle it.
            console.warn("Missing Firebase client configuration. Set NEXT_PUBLIC_FIREBASE_* env vars.");
        }
        firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
    }
    return firebaseApp!;
}

export function getFirebaseDb(): Firestore {
    return getFirestore(getFirebaseApp());
}

export function getFirebaseAuth(): Auth {
    return getAuth(getFirebaseApp());
}

export function getFirebaseStorage(): FirebaseStorage {
    return getStorage(getFirebaseApp());
}
