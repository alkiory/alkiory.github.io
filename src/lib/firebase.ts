import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
  measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Inicializa Firebase
// getApps().length === 0 para evitar errores si la app ya está inicializada (ej. en desarrollo con HMR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicializa otros servicios de Firebase que vayas a usar
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };