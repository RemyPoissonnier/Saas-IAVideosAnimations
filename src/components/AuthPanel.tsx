import { useState } from "react";
import type { FormEvent } from "react";
import { useI18n } from "../i18n";
import { auth, useAuth } from "../context/AuthContext";
import { RegisterModal } from "./RegisterModal";
import { ForgotPasswordModal } from "./forgotPasswordModal";
import Button from "./ui/Button";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

type SocialProvider = "google";

type AuthPanelProps = {
  onAuthComplete?: () => void;
  onNavigateToRegister?: () => void; // Callback to switch to the registration page
};

export function AuthPanel({
  onAuthComplete,
  onNavigateToRegister,
}: AuthPanelProps) {
  const { login } = useAuth(); // using login instead of register
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const finishAuthFlow = () => {
    if (onAuthComplete) onAuthComplete();
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error("Error with Google Sign-In", error);
      throw error;
    }
  };

  const handleManualLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!email || !password) return;

    try {
      await login(email, password);
      finishAuthFlow();
    } catch (err) {
      setError("Invalid email or password"); // You might want to add a translation key here
    }
  };

  const handleGuestLogin = async () => {
    const gEmail = "test3@gmail.com";
    const gPwd = "JeSuisUnTest34@";

    try {
      await login(gEmail, gPwd);
      finishAuthFlow();
    } catch (err) {
      setError("Invalid email or password"); // You might want to add a translation key here
    }
  };

  const handleSocialSignIn = async (provider: SocialProvider) => {
    setError("");
    try {
      if (provider === "google") {
        await loginWithGoogle(); // 2. Appel de la connexion Firebase
        finishAuthFlow();
      }
    } catch (err: any) {
      setError(err.message || "Failed to login with Google");
    }
  };

  return (
    <div className="flex object-center justify-center">
      <div className={` space-y-4`}>
        <div className="space-y-1">
          {/* Changed translation keys to specific Login titles */}
          <h3 className="text-xl font-semibold text-text">
            {t("auth.signInTitle") || "Welcome Back"}
          </h3>
          <p>
            {t("auth.signInSubtitle") ||
              "Enter your credentials to access your account"}
          </p>
        </div>

        <div className="space-y-3">
          {/* Social Login Section */}
          <div>{t("auth.socialTitle")}</div>
          <div className="grid grid-cols-1 gap-2">
            <Button
              className="flex items-center justify-center gap-3 rounded-xl border border-border/60
              px-4 py-3 text-sm shadow-sm transition 
              hover:-translate-y-0.5 hover:shadow dark:bg-yellow-500 font-bold
              text-orange-600 dark:text-amber-900"
              onClick={() => handleSocialSignIn("google")}
            >
              <FontAwesomeIcon
                icon={faGoogle}
                className="h-5 w-5 text-orange-600 dark:text-amber-900"
              />
              {t("auth.social.google")}
            </Button>
          </div>
        </div>

        <div className="h-px w-full bg-border/60" />
        <div>{t("auth.manualTitle")}</div>

        <form className="grid grid-cols-1 gap-3" onSubmit={handleManualLogin}>
          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="space-y-2">
            <div className="flex flex-col justify-between">
              <label
                className="text-sm font-semibold text-text"
                htmlFor="email"
              >
                {t("auth.email")}
              </label>
              <input
                className="w-full rounded-lg"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-col justify-between">
              <label
                className="text-sm font-semibold text-text"
                htmlFor="password"
              >
                {t("auth.password")}
              </label>
              {/* Optional: Forgot Password Link */}
            </div>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <a
            onClick={() => setIsForgotModalOpen(true)}
            className="text-xs text-slate-500 hover:text-slate-800"
          >
            {t("auth.forgotPassword.title") || "Forgot?"}
          </a>
          <div className="flex gap-1">
            <div className="flex justify-end pt-2">
              <Button type="submit">{t("auth.signin") || "Sign In"}</Button>
            </div>
            <div className="flex">
              <Button onClick={handleGuestLogin}>GUEST TEST</Button>
            </div>
          </div>
        </form>

        {/* The Link to Create an Account */}
        <div className="pt-2 text-center text-xs text-muted">
          {t("auth.noAccount") || "Don't have an account?"}{" "}
          <Button
            // MODIFICATION ICI : Ouvre la modale au lieu de naviguer
            onClick={() => setIsRegisterOpen(true)}
            className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-800 dark:text-white dark:decoration-slate-600"
          >
            {t("auth.signupLink") || "Create one"}
          </Button>
        </div>

        {/* Intégration de la Modale ICI */}
      </div>

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={() => {
          console.log("Compte créé et connecté !");
          finishAuthFlow();
        }}
      />

      {/* Intégration de la Modale en dehors du formulaire */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </div>
  );
}

export default AuthPanel;
