import { Link } from "react-router-dom";
import Pill from "../Pill";
import { useState, useRef } from "react";
import  { useAuth } from "../../../context/AuthContext";
import  { useI18n } from "../../../i18n";
import logoZoom from "../../../assets/logoZoom.png";
import { Option } from "../../Option";


type HeaderDProps = {
  onOpenAuth: () => void;
  onBackHome?: () => void;
  isAuthPage?: boolean;
  tokensHref: string;
};



export default function DesktopHeader({onOpenAuth, onBackHome, isAuthPage, tokensHref} : HeaderDProps) {
    const { t } = useI18n();
  const { currentUser, userProfile, logout } = useAuth();
  // States
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // Refs
  const settingsMenuRef = useRef<HTMLDivElement | null>(null);
  
  return (
       <header
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 
        hidden md:flex items-center justify-between gap-4 
        rounded-full border border-border/60 bg-surface/70 px-4 py-2 
        shadow-md backdrop-blur-md transition-all duration-300"
      >
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex flex-row">
            <Link
              to="/home"
              className=" w-1/2 hover:opacity-80 transition-opacity"
            >
              <img
                src={logoZoom}
                alt="Logo"
                className="max-h-10 max-w-10 rounded-full object-cover"
              />
            </Link>
            <Link
              to="/home"
              className="w-1/2 text-base font-bold leading-tight text-text hover:text-accent transition-colors"
            >
              {t("brand.name")}
            </Link>
          </div>
          {/* Desktop Links */}
          <div className="ml-2 h-4 w-[1px] bg-border/40" /> {/* Separator */}
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
                {isSettingsOpen ? "▲" : "▼"}
              </span>
            </button>
            {isSettingsOpen && (
              <div className="absolute top-full right-0 mt-2">
                <Option />
              </div>
            )}
          </div>

          {/* User Auth State */}
          {currentUser ? (
            <div className="flex items-center gap-3 pl-2">
              <div className="flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1 border border-border/30">
                <span className="text-xs">🪙</span>
                <span className="text-xs font-mono font-bold">
                  {userProfile?.wallet_balance ?? 0}
                </span>
              </div>
              <button
                onClick={logout}
                className="text-xs font-semibold text-red-400 hover:text-red-500 transition-colors"
              >
                {t("auth.signout")}
              </button>
            </div>
          ) : (
            <button
              className="rounded-full bg-text text-surface px-5 py-1.5 text-sm font-bold hover:bg-accent transition-colors"
              type="button"
              onClick={onOpenAuth}
            >
              {t("nav.login")}
            </button>
          )}

          {isAuthPage && onBackHome && (
            <div className="ml-2">
              <Pill label={t("nav.backHome")} onClick={onBackHome} />
            </div>
          )}
        </div>
      </header>
  )
}
