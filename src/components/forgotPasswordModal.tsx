// ForgotPasswordModal.tsx
import { useState, type FormEvent } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
// Ajustez le chemin d'import selon votre structure (ex: '../firebase' ou '../context/AuthContext')
import { auth } from '../context/AuthContext'; 
import { useI18n } from '../i18n';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  // 1. Hooks
  const { t } = useI18n(); //TODO I18N
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(''); // Pour le succès
  const [error, setError] = useState('');

  // 2. Condition d'affichage (après les hooks)
  if (!isOpen) return null;

  // 3. Logique
  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      // Fonction native Firebase pour envoyer le mail
      await sendPasswordResetEmail(auth, email);
      setMessage("Un email de réinitialisation a été envoyé ! Vérifiez vos spams.");
      // On ne ferme pas la modale tout de suite pour laisser l'utilisateur lire le message
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/user-not-found') {
          setError("Aucun compte n'est associé à cet email.");
        } else if (err.code === 'auth/invalid-email') {
          setError("L'adresse email est invalide.");
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-white mb-2">Mot de passe oublié ?</h2>
        <p className="text-sm text-slate-400 mb-6">
          Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          {/* Message de succès */}
          {message && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm flex items-center gap-2">
              <span>✅</span> {message}
            </div>
          )}

          {/* Message d'erreur */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="email@exemple.com"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !!message} // On désactive si chargement ou si succès
            className="flex justify-center w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-full 
            transition shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
          </button>
        </form>
      </div>
    </div>
  );
}