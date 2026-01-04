import Pill from "../Pill";
import { useI18n } from "../../../i18n";
import { useAuth } from "../../../context/AuthContext";

type authDeskProp = {
  onOpenAuth: () => void;
  handleLogoutClick: () => void;
  isAuthPage?: boolean;
  onBackHome?: () => void;
};

export default function AuthStateDesk({
  handleLogoutClick,
  onOpenAuth,
  isAuthPage,
  onBackHome,
}: authDeskProp) {
  const { t } = useI18n();
  const { currentUser, userProfile } = useAuth();

  return (
    <>
      {/* User Auth State */}
      {currentUser ? (
        <div className="flex items-center gap-3 pl-2">
          <div className="flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1 border border-border/30">
            <span className="text-xs">🪙</span>
            <span className="text-xs font-mono font-bold">
              {userProfile?.wallet_balance ?? 0}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-xs font-mono font-bold">
              {currentUser.displayName}
            </span>
            <button
              onClick={handleLogoutClick} // On n'appelle plus logout directement
              className="text-xs font-semibold text-red-400 hover:text-red-500 transition-colors"
            >
              {t("auth.signout")}
            </button>
          </div>
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
    </>
  );
}
