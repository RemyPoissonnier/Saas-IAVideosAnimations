import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useI18n } from "../../../i18n";
import logoZoom from "../../../assets/logoZoom.png";
import { Option } from "../../Option";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import AuthStateDesk from "./authStateDesk";
import LogoutModal from "./LogoutModal";

type HeaderDProps = {
  onOpenAuth: () => void;
  onBackHome?: () => void;
  isAuthPage?: boolean;
  tokensHref: string;
};

export default function DesktopHeader({
  onOpenAuth,
  onBackHome,
  isAuthPage,
  tokensHref,
}: HeaderDProps) {
  const { t } = useI18n();
  const { logout } = useAuth();

  // States
  // Utilise 'boolean' (primitif) et non 'Boolean' (objet wrapper)
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  // Refs
  const settingsMenuRef = useRef<HTMLDivElement | null>(null);

  // Close settings on click outside
  useOnClickOutside(settingsMenuRef, () => setIsSettingsOpen(false));

  // Handlers
  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 
          hidden md:flex items-center justify-between gap-4 
          rounded-full border border-border/60 bg-surface/70 px-4 py-2 
          shadow-md backdrop-blur-md transition-all duration-300"
      >
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex flex-row items-center">
            <Link to="/home" className="hover:opacity-80 transition-opacity">
              <img
                src={logoZoom}
                alt="Logo"
                className="h-10 w-10 rounded-full object-cover"
              />
            </Link>
            <Link
              to="/home"
              className="ml-2 text-base font-bold leading-tight text-text hover:text-accent transition-colors"
            >
              {t("brand.name")}
            </Link>
          </div>
          {/* Desktop Links */}
          <div className="ml-2 h-4 w-[1px] bg-border/40" />
          <Link
            to="/prompt"
            className="px-3 text-sm font-semibold text-text hover:text-accent transition-colors"
          >
            {t("nav.prompt")}
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            to={tokensHref}
            className="px-3 text-sm font-semibold text-text hover:text-accent transition-colors"
          >
            {t("nav.tokens")}
          </Link>

          {/* Settings Dropdown */}
          <div className="relative z-20" ref={settingsMenuRef}>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="flex items-center gap-1 px-3 text-sm font-semibold text-text hover:text-accent transition-colors"
            >
              {t("nav.settings")}
              <span className="text-[10px] text-muted">
                <FontAwesomeIcon
                  icon={isSettingsOpen ? faAngleUp : faAngleDown}
                />
              </span>
            </button>
            {isSettingsOpen && (
              <div className="absolute top-full right-0 mt-2">
                <Option />
              </div>
            )}
          </div>

          {/* User Auth State */}
          <AuthStateDesk
            onOpenAuth={onOpenAuth}
            onBackHome={onBackHome}
            isAuthPage={isAuthPage}
            handleLogoutClick={handleLogoutClick}
          />
        </div>
      </header>

      {/* --- MODALE DE DECONNEXION --- */}
      <LogoutModal
        isLogoutModalOpen={isLogoutModalOpen}
        setIsLogoutModalOpen={setIsLogoutModalOpen}
        handleConfirmLogout={handleConfirmLogout}
      />
    </>
  );
}
