import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
  type Auth,
} from "firebase/auth";
// NOUVEAU : On importe onSnapshot pour écouter en temps réel
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { app } from "../components/hooks/firebase";
import { apiClient } from "../components/hooks/apiClient";

export const auth: Auth = getAuth(app);
export const db = getFirestore(app);

// --- 2. DÉFINITION DES TYPES ---
interface AuthContextType {
  currentUser: User | null;
  userProfile: any; // NOUVEAU : Contient les infos de la DB (wallet, role...)
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, pseudo: string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// --- 3. LE PROVIDER ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null); // NOUVEAU : Stocke les données Firestore
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      // Si l'utilisateur n'est pas connecté, on arrête de charger
      if (!user) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      // NOUVEAU : Écoute en temps réel du document utilisateur dans Firestore
      // Dès que le wallet change via l'API, cette fonction s'active !
      const userDocRef = doc(db, "users", user.uid);

      const unsubscribeFirestore = onSnapshot(
        userDocRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();

            // --- MIGRATION AUTOMATIQUE ---
            // Si l'utilisateur existe mais n'a pas de wallet_balance (vieux compte)
            if (data.wallet_balance === undefined) {
              console.log(
                "Migration : Ajout du wallet pour l'utilisateur existant"
              );
              setDoc(userDocRef, { wallet_balance: 0 }, { merge: true });
              // La mise à jour va relancer cet écouteur avec la nouvelle valeur
            } else {
              setUserProfile(data);
            }
          } else {
            // Si le document n'existe pas du tout (cas rare), on peut le créer ici si besoin
            console.log("Pas de profil trouvé pour cet utilisateur");
          }
          setLoading(false);
        },
        (error) => {
          console.error("Erreur Firestore:", error);
          setLoading(false);
        }
      );

      // Nettoyage de l'écouteur Firestore quand l'utilisateur change
      return () => unsubscribeFirestore();
    });

    return unsubscribeAuth; // Nettoyage Auth
  }, []);

  // ... (Tes fonctions login, register, logout restent identiques) ...
  const login = async (email: string, pass: string) => {
    try {
      // 1. Connexion Standard Firebase (Client)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );
      const user = userCredential.user;

      // 2. Récupération du ID Token (Le fameux sésame qui dure 1h)
      // "true" force le rafraichissement pour être sûr d'avoir un token frais
      const token = await user.getIdToken();

      // 👇 INDISPENSABLE : On demande au serveur de créer le cookie
      await apiClient('/sessionLogin', 'POST', { idToken: token });

      console.log("🔓 Authentification réussie !");
      console.log("🎫 ID Token récupéré :", token); // <--- C'est lui qu'on enverra à ton API Docker

      // TODO: Plus tard, ici, on fera : await axios.post('http://ton-api/session', { idToken });
    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      throw error; // On renvoie l'erreur pour que l'interface puisse afficher "Mot de passe incorrect"
    }
  };

  const register = async (email: string, pass: string, pseudo: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    const user = result.user;
    await updateProfile(user, { displayName: pseudo });

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      pseudo: pseudo,
      email: email,
      wallet_balance: 0, // Nouveau compte : on met 0 direct
      createdAt: new Date().toISOString(),
      role: "user",
    });

    // Pas besoin de setCurrentUser manuel ici, le onAuthStateChanged va le faire
  };

  const logout = () => {
    return signOut(auth);
  };

  const getToken = async () => {
    if (!currentUser) return null;
    return await currentUser.getIdToken(true);
  };

  const value = {
    currentUser,
    userProfile, // NOUVEAU : On l'expose pour l'utiliser dans le site
    loading,
    login,
    register,
    logout,
    getToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
