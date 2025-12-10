// RegisterModal.tsx
import { useState, type FormEvent } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { useAuth, db } from '../context/AuthContext';
import { PASSWORD_REGEX } from '../utils/authUtils';
import { useI18n } from '../i18n';

// TODO I18N
interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}


export function RegisterModal({ isOpen, onClose, onSuccess }: RegisterModalProps) {
  const { register } = useAuth(); // On récupère la fonction register de ton contexte
  const { t } = useI18n()
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Fonction utilitaire pour vérifier le pseudo dans Firestore
  const checkPseudoAvailability = async (pseudoToCheck: string): Promise<boolean> => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("pseudo", "==", pseudoToCheck));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Retourne true si le pseudo existe déjà
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 1. Validation Locale (Mot de passe)
    if (!PASSWORD_REGEX.test(password)) {
      setError(t("register.error.pw"));
      setIsLoading(false);
      return;
    }

    try {
      // 2. Vérification Pseudo (Firestore)
      const isPseudoTaken = await checkPseudoAvailability(pseudo);
      if (isPseudoTaken) {
        setError(t("register.error.pseudoAlUsed"));
        setIsLoading(false);
        return;
      }

      // 3. Tentative d'inscription (Firebase Auth + Création Doc)
      // Ta fonction 'register' du contexte gère déjà tout !
      await register(email, password, pseudo);

      // Si on arrive ici, c'est que tout est OK
      onSuccess();
      onClose();
      
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof FirebaseError) {
        // Gestion des erreurs spécifiques Firebase
        if (err.code === 'auth/email-already-in-use') {
          setError(t("register.error.pseudoAlUsed"));
        } else if (err.code === 'auth/weak-password') {
          setError(t("register.error.weakpw"));
        } else {
          setError("Une erreur est survenue lors de l'inscription : " + err.message +" code :" + err.code);
        }
      } else {
        setError("Une erreur inattendue est survenue.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          ✕
        </button>

        <p className="text-sm text-slate-400 mb-6">{t("register.indication")}</p>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase">{t("register.pseudo")}</label>
            <input 
              type="text" 
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="Votre pseudo"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase">{t("register.email")}</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="email@exemple.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase">{t("register.pw")}</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition shadow-lg shadow-indigo-500/20 disabled:opacity-50 mt-2"
          >
            {isLoading ? t("register.loading") : t("register.register")}
          </button>
        </form>
      </div>
    </div>
  );
}