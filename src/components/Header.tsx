import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../i18n";
import { pill, primaryButton } from "../theme/styles";
import logoZoom from "../assets/logoZoom.png";
import { Option } from "./Option";

type HeaderProps = {
  onOpenAuth: () => void;
  onBackHome?: () => void;
  isAuthPage?: boolean;
  tokensHref?: string;
};

export function Header({
  onOpenAuth,
  onBackHome,
  isAuthPage,
  tokensHref = "/tokens",
}: HeaderProps) {
  const { t } = useI18n();
  const { currentUser, userProfile, logout } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const animalMenuRef = useRef<HTMLDivElement | null>(null);
  const settingsMenuRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="mb-20">
      <header
        className="fixed top-4 left-1/2 z-50 flex -translate-x-1/2 items-center
      justify-between shadow-md gap-4 rounded-full border border-border/60 bg-surface/70 px-2 py-1 
      backdrop-blur-md"
      >
        <div className="" />
        <div className="flex items-center gap-3">
          <a href="/home" className="relative z-10">
            <img
              src={logoZoom}
              alt="Logo"
              className="grid h-11 w-11 place-items-center rounded-full"
            />
          </a>
          <div>
            <div className="text-base font-bold leading-tight text-text">
              {t("brand.name")}
            </div>
            <div className="text-xs font-medium text-muted">
              {t("nav.generator")}
            </div>
          </div>
          <div className="ml-3 relative z-10" ref={animalMenuRef}>
              <a className="text-muted text-[11px] uppercase tracking-wide"
              href="/prompt">
                {t("nav.prompt")} 
              </a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={tokensHref}
            className={`${pill} px-4 text-sm font-semibold text-text hover:border-accent`}
          >
            {t("nav.tokens")}
          </a>
          <div className="relative z-10" ref={settingsMenuRef}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={isSettingsOpen}
              onClick={() => setIsSettingsOpen((open) => !open)}
              className={`${pill} flex items-center gap-2 px-4 text-sm font-semibold text-text`}
            >
              {t("nav.settings")}
              <span className="text-muted">{isSettingsOpen ? "▲" : "▼"}</span>
            </button>
            {isSettingsOpen ? <Option /> : null}
          </div>
          {isAuthPage && onBackHome ? (
            <button
              className={`${pill} px-4`}
              type="button"
              onClick={onBackHome}
            >
              {t("nav.backHome")}
            </button>
          ) : null}
          {currentUser ? (<>
            <div className="flex items-center gap-2">
              {currentUser.displayName}
            </div>
            <div className="flex items-center gap-2">
              <span>🪙</span>
              {/* Si userProfile n'est pas encore chargé, on met 0 ou un petit chargement */}
              <span>{userProfile?.wallet_balance ?? 0}</span>
            </div>
          </>
            
          ) : (
            <button
              className={`${primaryButton} rounded-full px-5`}
              type="button"
              onClick={onOpenAuth}
            >
              {t("nav.login")}
            </button>
          )}
        </div>
      </header>

      {currentUser ? ( //TODO to update
        <button
          className={`${pill} px-4 bg-red-200 text-black hover:bg-red-700`}
          type="button"
          onClick={logout}
        >
          {t("auth.signout")}
        </button>
      ) : null}
    </div>
  );
}

export default Header;
