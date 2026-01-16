import { initializeApp } from "firebase/app";
import { getAnalytics, setAnalyticsCollectionEnabled } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

// 1. On initialise Analytics
const analytics = getAnalytics(app);

// 2. IMPORTANT : On désactive la collecte par défaut !
setAnalyticsCollectionEnabled(analytics, false); 

export { app, analytics };