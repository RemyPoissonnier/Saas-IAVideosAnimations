// ForgotPasswordModal.tsx
import { useState, type FormEvent } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
// Ajustez le chemin d'import selon votre structure (ex: '../firebase' ou '../context/AuthContext')
import { auth } from "../context/AuthContext";
import { useI18n } from "../i18n";
import Button from "./ui/Button";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  // 1. Hooks
  const { t } = useI18n(); //TODO I18N
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(""); // Pour le succès
  const [error, setError] = useState("");

  // 2. Condition d'affichage (après les hooks)
  if (!isOpen) return null;

  // 3. Logique
  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      // Fonction native Firebase pour envoyer le mail
      await sendPasswordResetEmail(auth, email);
      setMessage(t("auth.forgotPassword.successMessage"));
      // On ne ferme pas la modale tout de suite pour laisser l'utilisateur lire le message
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof FirebaseError) {
        if (err.code === "auth/user-not-found") {
          setError(t("auth.forgotPassword.error.userNotFound"));
        } else if (err.code === "auth/invalid-email") {
          setError(t("auth.forgotPassword.error.invalidEmail"));
        } else {
          setError(t("auth.forgotPassword.error.prefix") + err.message);
        }
      } else {
        setError(t("auth.forgotPassword.error.generic"));
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

        <h2 className="text-xl font-bold text-white mb-2">
          {t("auth.forgotPassword.title")}
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          {t("auth.forgotPassword.subtitle")}
        </p>

        <form onSubmit={handleReset} className="space-y-4 flex flex-col justify-center">
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
            <label className="text-xs font-semibold text-slate-300 uppercase">
              {t("auth.forgotPassword.emailLabel")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder={t("auth.forgotPassword.emailPlaceholder")}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !!message} // On désactive si chargement ou si succès
            className=" justify-center  content-center transition  
            disabled:opacity-50 disabled:cursor-not-allowed "
          >
            {isLoading ? t("auth.forgotPassword.buttonLoading") : t("auth.forgotPassword.buttonSend")}
          </Button>
        </form>
      </div>
    </div>
  );
}
