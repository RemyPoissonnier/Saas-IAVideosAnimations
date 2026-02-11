import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useI18n } from "../../../i18n";
import logoZoom from "../../../assets/logoZoom.png";
import { Option } from "../../Option"; // Assure-toi que le chemin est bon
import { Link } from "react-router-dom";
import { faAngleUp, faAngleDown, faBars, faXmark, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Helper Component for Mobile Links
const MobileLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Link
    to={href}
    onClick={onClick}
    className="text-3xl font-medium tracking-tight hover:text-accent transition-colors"
  >
    {children}
  </Link>
);

type HeaderMProps = {
  onOpenAuth: () => void;
  tokensHref: string;
};

export default function MobileHeader({ onOpenAuth, tokensHref }: HeaderMProps) {
  const { t } = useI18n();
  const { currentUser, userProfile, logout } = useAuth();

  // States
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Trigger Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-full bg-surface/80 border border-border/60 backdrop-blur-md shadow-lg text-text"
          aria-label="Open Menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-surface text-text md:hidden overflow-y-auto"
          >
            {/* Header Inside Overlay */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/20 sticky top-0 bg-surface z-10">
              <div className="flex items-center gap-3">
                <img
                  src={logoZoom}
                  alt="Logo"
                  className="h-8 w-8 rounded-full"
                />
                <span className="font-bold text-lg">{t("brand.name")}</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-surface-2 text-text hover:bg-border/20 transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            {/* Navigation Content */}
            <nav className="flex flex-col items-center justify-start pt-10 px-6 pb-20 text-center w-full max-w-md mx-auto">
              <div className="flex flex-col gap-6 w-full items-center">
                <MobileLink href="/home" onClick={() => setIsMobileMenuOpen(false)}>
                  {t("nav.home")}
                </MobileLink>
                
                {/* Prompt Accordion */}
                <div className="w-full">
                  <button
                    onClick={() => setIsPromptOpen(!isPromptOpen)}
                    className="flex items-center justify-center gap-2 mx-auto text-3xl font-medium tracking-tight hover:text-accent transition-colors"
                  >
                    {t("nav.prompt")}
                    <motion.div
                      animate={{ rotate: isPromptOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FontAwesomeIcon icon={faAngleDown} className="text-xl" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isPromptOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col gap-4 mt-4"
                      >
                        <Link
                          to="/prompt"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-xl opacity-80 hover:opacity-100 hover:text-accent"
                        >
                          {t("nav.promptOptions.standard")}
                        </Link>
                        <Link
                          to="/prompt/slop-generator"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-xl opacity-80 hover:opacity-100 hover:text-accent"
                        >
                          {t("nav.promptOptions.slop")}
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <MobileLink href={tokensHref} onClick={() => setIsMobileMenuOpen(false)}>
                  {t("nav.tokens")}
                </MobileLink>
              </div>

              <div className="w-16 h-[1px] bg-border/30 my-8" />

              {/* Auth Section */}
              {currentUser ? (
                <div className="flex flex-col gap-4 items-center w-full">
                  <div className="flex items-center gap-2 text-xl font-medium">
                    <span>{currentUser.displayName}</span>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-surface-2 border border-border/30 shadow-sm">
                    <span className="text-xl">🪙</span>
                    <span className="font-bold text-lg">
                      {userProfile?.wallet_balance ?? 0}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-red-400 font-semibold mt-2 hover:text-red-300 transition-colors"
                  >
                    {t("auth.signout")}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-2xl font-bold hover:text-accent transition-colors"
                >
                  {t("nav.login")}
                </button>
              )}

              {/* Settings Dropdown (Accordion Style) */}
              <div className="w-full mt-10">
                <button
                  className={`flex items-center justify-center gap-2 mx-auto text-muted text-sm uppercase tracking-widest font-semibold transition-colors ${isSettingsOpen ? 'text-accent' : ''}`}
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                >
                  <FontAwesomeIcon icon={faGear} className="text-xs" />
                  {t("nav.settings")}{" "}
                  <motion.div
                    animate={{ rotate: isSettingsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FontAwesomeIcon icon={faAngleDown} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isSettingsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden w-full"
                    >
                      {/* On passe la prop isMobile=true ici */}
                      <Option isMobile={true} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}