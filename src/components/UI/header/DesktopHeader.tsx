import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useI18n } from "../../../i18n";
import logoZoom from "../../../assets/logoZoom.png";
import { Option } from "../../Option";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import LogoutModal from "./LogoutModal";
import AuthStateDesk from "./AuthStateDesk";

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
  const [isPromptOpen, setIsPromptOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  // Refs
  const settingsMenuRef = useRef<HTMLDivElement | null>(null);
  const promptMenuRef = useRef<HTMLDivElement | null>(null);

  // Close settings on click outside
  useOnClickOutside(settingsMenuRef, () => setIsSettingsOpen(false));
  useOnClickOutside(promptMenuRef, () => setIsPromptOpen(false));

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
        className="md:flex hidden items-center justify-between gap-4 
          rounded-full border border-border/60 bg-surface/70 px-4 py-2 
          shadow-md backdrop-blur-md transition-all duration-300"
      >
        {/* Logo & Brand */}
        <div className="flex items-center w-1/5">
          <div className="flex flex-row items-center">
            <Link
              to="/home"
              className="w-14 hover:opacity-80 transition-opacity"
            >
              <img
                src={logoZoom}
                alt="Logo"
                className="rounded-full object-cover"
              />
            </Link>
            <Link
              to="/home"
              className=" ml-2 text-base font-bold leading-tight text-text hover:text-accent transition-colors"
            >
              {t("brand.name")}
            </Link>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center justify-between gap-2 w-full">
          {/* Prompt Dropdown */}
          <div className="relative z-20" ref={promptMenuRef}>
            <button
              type="button"
              onClick={() => setIsPromptOpen(!isPromptOpen)}
              className="flex items-center gap-1 px-3 text-sm font-semibold text-text hover:text-accent transition-colors"
            >
              {t("nav.prompt")}
              <span className="text-[10px] text-muted">
                <FontAwesomeIcon
                  icon={isPromptOpen ? faAngleUp : faAngleDown}
                />
              </span>
            </button>
            {isPromptOpen && (
              <div className="absolute top-full left-0 mt-2 min-w-[180px] rounded-xl border border-border/60 bg-surface/90 p-2 shadow-xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
                <Link
                  to="/prompt"
                  onClick={() => setIsPromptOpen(false)}
                  className="block w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-text hover:bg-accent/10 hover:text-accent transition-all"
                >
                  {t("nav.promptOptions.standard")}
                </Link>
                <Link
                  to="/prompt/slop-generator"
                  onClick={() => setIsPromptOpen(false)}
                  className="block w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-text hover:bg-accent/10 hover:text-accent transition-all"
                >
                  {t("nav.promptOptions.slop")}
                </Link>
              </div>
            )}
          </div>

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
