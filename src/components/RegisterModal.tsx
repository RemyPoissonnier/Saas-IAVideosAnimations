// RegisterModal.tsx
import { useState, type FormEvent, useEffect } from 'react'; // Added useEffect
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { useAuth, db } from '../context/AuthContext';
import { useI18n } from '../i18n';

// On garde votre Regex global pour la validation finale, mais on le découpe pour l'UI
import { PASSWORD_REGEX } from '../utils/authUtils'; 

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RegisterModal({ isOpen, onClose, onSuccess }: RegisterModalProps) {
  const { register } = useAuth();
  const { t } = useI18n();
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Nouveau State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // État pour suivre la validité de chaque règle en temps réel
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    upper: false,
    lower: false,
    digit: false,
    special: false
  });

  
  // Analyse du mot de passe en temps réel (While typing)
  useEffect(() => {
    setPasswordCriteria({
      length: password.length >= 8,
      upper: /(?=.*?[A-Z])/.test(password),
      lower: /(?=.*?[a-z])/.test(password),
      digit: /(?=.*?[0-9])/.test(password),
      special: /(?=.*?[#?!@$%^&*-])/.test(password)
    });
  }, [password]);
  
  if (!isOpen) return null;

  const checkPseudoAvailability = async (pseudoToCheck: string): Promise<boolean> => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("pseudo", "==", pseudoToCheck));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 1. Validation : Les mots de passe correspondent-ils ?
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    // 2. Validation : Le regex est-il respecté ?
    if (!PASSWORD_REGEX.test(password)) {
      setError(t("register.error.pw")); // Message générique si le visuel n'a pas suffi
      setIsLoading(false);
      return;
    }

    try {
      const isPseudoTaken = await checkPseudoAvailability(pseudo);
      if (isPseudoTaken) {
        setError(t("register.error.pseudoAlUsed"));
        setIsLoading(false);
        return;
      }

      await register(email, password, pseudo);
      onSuccess();
      onClose();
      
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/email-already-in-use') {
          setError(t("register.error.pseudoAlUsed"));
        } else if (err.code === 'auth/weak-password') {
          setError(t("register.error.weakpw"));
        } else {
          setError("Erreur : " + err.message);
        }
      } else {
        setError("Une erreur inattendue est survenue.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper pour l'affichage des critères (UI UX)
  const CriteriaItem = ({ met, label }: { met: boolean, label: string }) => (
    <li className={`text-xs flex items-center gap-2 transition-colors duration-200 ${met ? 'text-green-400' : 'text-slate-500'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${met ? 'bg-green-400' : 'bg-slate-600'}`} />
      {label}
    </li>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
        
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

          {/* Pseudo Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase">{t("register.pseudo")}</label>
            <input 
              type="text" 
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="Votre pseudo"
              required
            />
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase">{t("register.email")}</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="email@exemple.com"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase">{t("register.pw")}</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
            />
            {/* Visual Feedback for Password Rules */}
            <ul className="grid grid-cols-2 gap-1 mt-2 pl-1">
              <CriteriaItem met={passwordCriteria.length} label="8+ caractères" />{/* TODO I18N*/}
              <CriteriaItem met={passwordCriteria.upper} label="1 Majuscule" />
              <CriteriaItem met={passwordCriteria.lower} label="1 Minuscule" />
              <CriteriaItem met={passwordCriteria.digit} label="1 Chiffre" />
              <CriteriaItem met={passwordCriteria.special} label="1 Caractère spécial" />
            </ul>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase">Confirmer le mot de passe</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full bg-slate-800 border rounded-lg px-4 py-2 text-white focus:ring-2 outline-none transition ${
                confirmPassword && password !== confirmPassword 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-slate-700 focus:ring-indigo-500'
              }`}
              required
            />
             {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-400 mt-1">Les mots de passe ne correspondent pas.</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="flex justify-center w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-full 
            transition shadow-lg shadow-indigo-500/20 disabled:opacity-50 mt-4"
          >
            {isLoading ? t("register.loading") : t("register.register")}
          </button>
        </form>
      </div>
    </div>
  );
}