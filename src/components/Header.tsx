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
  activeAnimal?: "cat" | "dog";
  onSelectAnimal?: (animal: "cat" | "dog") => void;
  tokensHref?: string;
};

export function Header({
  onOpenAuth,
  onBackHome,
  isAuthPage,
  activeAnimal = "cat",
  onSelectAnimal,
  tokensHref = "/tokens",
}: HeaderProps) {
  const { t } = useI18n();
  const { currentUser, logout } = useAuth();
  const [isAnimalMenuOpen, setIsAnimalMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const animalMenuRef = useRef<HTMLDivElement | null>(null);
  const settingsMenuRef = useRef<HTMLDivElement | null>(null);

  const handleAnimalChange = (next: "cat" | "dog") => {
    setIsAnimalMenuOpen(false);
    onSelectAnimal?.(next);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const inAnimal = animalMenuRef.current?.contains(target);
      const inSettings = settingsMenuRef.current?.contains(target);

      if (!inAnimal) setIsAnimalMenuOpen(false);
      if (!inSettings) setIsSettingsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex gap-x-3">
      <header className="relative flex items-center justify-between gap-4 overflow-visible rounded-full border border-border/60 bg-surface/70 px-6 py-3 shadow-card backdrop-blur">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,240,193,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,161,255,0.08),transparent_42%)]" />
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
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={isAnimalMenuOpen}
              onClick={() => setIsAnimalMenuOpen((open) => !open)}
              className="flex items-center gap-2 rounded-full border border-border/60 bg-surface px-3 py-2 text-xs font-semibold text-text shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <span className="text-muted text-[11px] uppercase tracking-wide">
                {t("nav.animals")} {isAnimalMenuOpen ? "▲" : "▼"}
              </span>
            </button>
            {isAnimalMenuOpen ? (
              <div className="absolute left-0 z-20 mt-2 w-40 overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-lg shadow-black/10">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-2 text-left text-xs font-semibold text-text hover:bg-surface-strong/40"
                  onClick={() => handleAnimalChange("cat")}
                >
                  {t("nav.catPage")}
                  {activeAnimal === "cat" ? (
                    <span className="text-accent">●</span>
                  ) : null}
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-2 text-left text-xs font-semibold text-text hover:bg-surface-strong/40"
                  onClick={() => handleAnimalChange("dog")}
                >
                  {t("nav.dogPage")}
                  {activeAnimal === "dog" ? (
                    <span className="text-accent">●</span>
                  ) : null}
                </button>
              </div>
            ) : null}
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
          {currentUser ? (
            <div className="flex items-center gap-2">
              {currentUser.displayName}
            </div>
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
        <button className={`${pill} px-4 bg-red-200 text-black hover:bg-red-700`} type="button" onClick={logout}>
          {t("auth.signout")}
        </button>
      ) : null}
    </div>
  );
}

export default Header;
