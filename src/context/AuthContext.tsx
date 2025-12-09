import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  type User, 
  type Auth 
} from "firebase/auth";
// Ajoute ces imports en haut
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth"; 

// ... (ton initialisation app)


// --- 1. CONFIGURATION (Vite) ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db = getFirestore(app); // On initialise la DB

// --- 2. DÉFINITION DES TYPES ---
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, pseudo:string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>; // Indispensable pour ton API Docker
}

// Création du Contexte (vide au départ)
const AuthContext = createContext<AuthContextType | null>(null);

// --- 3. LE PROVIDER (Le Composant qui englobe tout) ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Le "Vigile" qui surveille si l'état de connexion change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // On a fini de charger, on sait si on est connecté ou non
    });

    return unsubscribe; // Nettoyage quand le composant est détruit
  }, []);

  // Actions
  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

// ... (Dans ton AuthProvider)
const register = async (email: string, pass: string, pseudo: string) => {
  // 1. Créer le compte (Auth)
  const result = await createUserWithEmailAndPassword(auth, email, pass);
  const user = result.user;

  // 2. Mettre à jour le "Badge" (Auth Profile) pour l'affichage immédiat
  await updateProfile(user, {
    displayName: pseudo
  });

  // 3. Créer la fiche complète dans la Base de Données (Firestore)
  // On crée un document dans la collection 'users' avec l'ID de l'utilisateur
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    pseudo: pseudo,
    email: email,
    createdAt: new Date().toISOString(),
    role: "user" // Tu pourras mettre "admin" ici manuellement pour toi plus tard
  });

  // Petite astuce : on force le rafraichissement pour que le displayName apparaisse tout de suite
  setCurrentUser({ ...user, displayName: pseudo });
};

  const logout = () => {
    return signOut(auth);
  };

  const getToken = async () => {
    if (!currentUser) return null;
    return await currentUser.getIdToken(true);
  };

  // On expose tout ça
  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    getToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// --- 4. LE HOOK (useAuth) ---
// C'est ça que tu utiliseras dans tes composants
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};



// ... (Dans ton Interface AuthContextType)
