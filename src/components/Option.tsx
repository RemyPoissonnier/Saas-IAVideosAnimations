import { useI18n } from "../i18n";
import { useTheme } from "../theme";

export const Option = () => {
  const { locale, setLocale, t } = useI18n();
  const { theme, applied, setTheme } = useTheme();

  const cycleTheme = () => {
    const next =
      theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next);
  };

  const themeLabels: Record<string, string> = {
    light: "☀️ Light",
    dark: "🌙 Dark",
    system: "🖥️ Auto",
  };
  return (
    <div className="absolute right-0 z-20 mt-2 w-60 overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-lg shadow-black/10">
      <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
        {t("nav.settings")}
      </div>
      <div className="px-4 pb-3">
        <label
          className="text-xs font-semibold text-text"
          htmlFor="lang-select"
        >
          {t("nav.language")}
        </label>
        <select
          id="lang-select"
          aria-label={t("nav.language")}
          value={locale}
          onChange={(e) => setLocale(e.target.value as typeof locale)}
          className="mt-1 w-full rounded-xl border border-border/60 bg-surface px-3 py-2 text-sm text-text shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
        >
          <option value="fr">🇫🇷 FR</option>
          <option value="en">🇬🇧 EN</option>
        </select>
      </div>
      <div className="border-t border-border/60" />
      <button
        type="button"
        onClick={cycleTheme}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-text hover:bg-surface-strong/40"
      >
        <span>{t("nav.theme")}</span>
        <span className="text-muted">
          {themeLabels[theme]} · {applied}
        </span>
      </button>
    </div>
  );
};
