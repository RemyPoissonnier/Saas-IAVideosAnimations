import AuthPanel from "../components/AuthPanel";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n";
import { badge, ghostButton, subText } from "../theme/styles";

type LoginProps = {
  onBackHome: () => void;
};

export function Login({ onBackHome }: LoginProps) {
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/"); 
  };


  return (
    <div className="grid min-h-[70vh] grid-cols-1 gap-6 lg:grid-cols-[1.1fr,1fr]">
      <div
        className="relative flex-col gap-4 overflow-hidden rounded-3xl border 
      border-border/60 bg-gradient-to-br from-accent/20 
      via-surface to-surface p-6 shadow-md hidden lg:flex"
      >
        <div className="flex items-center gap-3">
          <div className={`${badge} w-fit bg-surface/80 text-accent-strong`}>
            {t("authPage.tagline")}
          </div>
          <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-strong">
            Trusted preview
          </span>
        </div>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-text md:text-4xl">
          {t("authPage.title")}
        </h1>
        <p className={`${subText} max-w-xl text-text/90`}>
          {t("authPage.subtitle")}
        </p>
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-surface-strong shadow-lg shadow-black/30">
          <video
            className="h-full w-full min-h-[260px] object-cover"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            src="/login-preview.mp4"
            poster="/login-poster.jpg"
          >
            {t("authPage.videoFallback")}
          </video>
        </div>
        <p className="text-xs text-text/80">{t("authPage.videoHint")}</p>
        <button 
            type="button" // Bonne pratique pour éviter les submits involontaires
            className="mt-auto flex text-left hover:opacity-80 transition-opacity relative z-10 
            cursor-pointer hover:text-orange-500" 
            onClick={handleHomeClick}
          >
            {t("nav.backHome")}
          </button>
      </div>

      <div className="flex items-stretch justify-center">
        <AuthPanel onAuthComplete={onBackHome} />
      </div>
    </div>
  );
}

export default Login;
