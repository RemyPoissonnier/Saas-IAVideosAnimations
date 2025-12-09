import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut,
  type Auth,
  type User,
} from "firebase/auth";

// 1. Configuration (Idéalement, utilise des variables d'environnement)
const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY || "TA_CLE_API",
  authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "ton-projet.firebaseapp.com",
  projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID || "ton-projet",
  storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: import.meta.env.REACT_APP_FIREBASE_APP_ID
};

// 2. Initialisation de l'instance Firebase
const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);

// --- FONCTIONS UTILITAIRES ---

/**
 * Récupère le token d'accès actuel de l'utilisateur (le "bracelet").
 * À utiliser avant chaque requête vers ton API Docker.
 */
export const getAuthToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (!user) return null;
  // forceRefresh: true permet de s'assurer que le token n'est pas expiré
  return await user.getIdToken(true);
};

/**
 * Connecte un utilisateur et renvoie l'objet User complet.
 */
export const loginUser = async (email: string, pass: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    return userCredential.user;
  } catch (error: any) {
    // Tu peux gérer ici des erreurs spécifiques (ex: compte bloqué)
    throw new Error(error.message);
  }
};

/**
 * Déconnecte l'utilisateur.
 */
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};