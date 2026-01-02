import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useI18n } from "../../../i18n";
import logoZoom from "../../../assets/logoZoom.png";
import { Option } from "../../Option";
import { Link } from "react-router-dom";


// Helper Component for Mobile Links to keep code DRY
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

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);


export default function MobileHeader({onOpenAuth, tokensHref} : HeaderMProps) {

    const { t } = useI18n();
      const { currentUser, userProfile, logout } = useAuth();
    
      // States
      const [isSettingsOpen, setIsSettingsOpen] = useState(false);
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
      // Lock body scroll when mobile menu is open
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
    
      // Common Nav Items logic could be extracted here if list grows
    
      
  return (
    <>
    <div className="fixed top-4 right-4 z-[60] md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-full bg-surface/80 border border-border/60 backdrop-blur-md shadow-lg text-text"
          aria-label="Open Menu"
        >
          <MenuIcon />
        </button>
      </div>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Bezier curve for "Mistral-like" feel
            className="fixed inset-0 z-[70] flex flex-col bg-surface text-text md:hidden"
          >
            {/* Mobile Header Inside Overlay */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/20">
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
                className="grid h-10 w-10 place-items-center rounded-full bg-surface-2 text-text hover:bg-border/20"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col items-center justify-center flex-1 gap-8 p-6 text-center">
              <MobileLink
                href="/home"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("brand.name")} Home
              </MobileLink>
              <MobileLink
                href="/prompt"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.prompt")}
              </MobileLink>
              <MobileLink
                href={tokensHref}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.tokens")}
              </MobileLink>

              <div className="w-12 h-[1px] bg-border/30 my-2" />

              {/* Mobile Auth Actions */}
              {currentUser ? (
                <div className="flex flex-col gap-4 items-center">
                  <div className="flex items-center gap-2 text-lg font-medium">
                    <span>{currentUser.displayName}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-2 border border-border/30">
                    <span>🪙</span>
                    <span className="font-bold">
                      {userProfile?.wallet_balance ?? 0}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-red-400 font-semibold mt-4"
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
                  className="text-2xl font-bold hover:text-accent"
                >
                  {t("nav.login")}
                </button>
              )}

              {/* Settings could be an accordion here, keeping it simple for now */}
              <button
                className="text-muted text-sm mt-8 flex items-center gap-2"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)} // Simple toggle in mobile
              >
                {t("nav.settings")} {isSettingsOpen ? "▲" : "▼"}
              </button>
              {isSettingsOpen && (
                <div className="p-4 bg-surface-2 rounded-xl w-full max-w-xs">
                  <Option />
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
