import { faSun, faMoon, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from "../i18n";
import { useTheme } from "../theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx'; // Assure-toi d'avoir clsx ou utilise des template literals si tu préfères

interface OptionProps {
  isMobile?: boolean;
}

export const Option = ({ isMobile = false }: OptionProps) => {
  const { locale, setLocale, t } = useI18n();
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const next =
      theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next);
  };

  const themeLabels: Record<string, React.ReactNode> = {
    light: <FontAwesomeIcon icon={faSun} />,
    dark: <FontAwesomeIcon icon={faMoon} />,
    system: <FontAwesomeIcon icon={faDesktop} />,
  };

  // Styles dynamiques selon le mode (Mobile vs Desktop)
  const containerClasses = isMobile
    ? "w-full flex flex-col gap-2 pt-2" // Mobile : Inline, pas de bordure externe, largeur fluide
    : "absolute right-0 z-20 mt-2 w-60 overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-lg shadow-black/10"; // Desktop : Carte flottante

  const itemClasses = isMobile
    ? "bg-surface-2/50 border border-border/20 rounded-lg px-4 py-3" // Mobile : Plus gros pour le tactile
    : "";

  return (
    <div className={containerClasses}>
      {/* Titre seulement visible sur Desktop, car sur mobile le bouton parent sert de titre */}
      {!isMobile && (
        <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
          {t("nav.settings")}
        </div>
      )}

      {/* Langue */}
      <div className={clsx("px-4 pb-3", isMobile && itemClasses)}>
        <label
          className="text-xs font-semibold text-text block mb-1"
          htmlFor="lang-select"
        >
          {t("nav.language")}
        </label>
        <select
          id="lang-select"
          aria-label={t("nav.language")}
          value={locale}
          onChange={(e) => setLocale(e.target.value as typeof locale)}
          className={clsx(
            "w-full rounded-xl border border-border/60 bg-surface px-3 py-2 text-sm text-text shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30",
            isMobile && "py-3" // Plus haut sur mobile
          )}
        >
          <option value="fr">🇫🇷 Français</option>
          <option value="en">🇬🇧 English</option>
        </select>
      </div>

      {!isMobile && <div className="border-t border-border/60" />}

      {/* Thème */}
      <button
        type="button"
        onClick={cycleTheme}
        className={clsx(
          "flex w-full items-center justify-between text-sm font-semibold text-text hover:bg-surface-strong/40 transition-colors",
          isMobile ? `${itemClasses} mt-2` : "px-4 py-3"
        )}
      >
        <span>{t("nav.theme")}</span>
        <span className="text-accent">{themeLabels[theme]}</span>
      </button>
    </div>
  );
};