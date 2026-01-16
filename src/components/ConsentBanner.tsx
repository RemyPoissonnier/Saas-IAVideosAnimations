import { useState, useEffect } from 'react';
import { getAnalytics, setAnalyticsCollectionEnabled } from "firebase/analytics";
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import Card from './ui/Card';
import TextType from './ui/TextType';
// J'importe tes composants UI génériques

export default function ConsentBanner() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Vérification initiale
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setIsVisible(true);
    } else if (consent === "granted") {
      activateTracking();
    }

    // 2. Écouteur pour ré-ouverture via le footer
    const handleReopen = () => setIsVisible(true);
    window.addEventListener('open-cookie-banner', handleReopen);
    return () => window.removeEventListener('open-cookie-banner', handleReopen);
  }, []);

  const activateTracking = () => {
    const analytics = getAnalytics();
    setAnalyticsCollectionEnabled(analytics, true);
  };

  const disableTracking = () => {
    const analytics = getAnalytics();
    setAnalyticsCollectionEnabled(analytics, false);
  }

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "granted");
    activateTracking();
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "denied");
    disableTracking();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-[400px] z-50">
      {/* Container principal : Card gère le background/blur/border */}
      <Card className="flex flex-col gap-5 p-6 shadow-2xl">
        
        {/* Titre via TextType */}
        <div className="mb-1">
          <TextType variant="h3">
            {t("cookie.title")}
          </TextType>
        </div>
        
        {/* Corps du texte */}
        <TextType variant="body">
          {t("cookie.text")}
        </TextType>
        
        {/* Zone d'actions */}
        <div className="flex flex-col gap-3 mt-2">
          {/* Bouton Accepter : On utilise une bordure neutre pour laisser ton thème s'exprimer */}
          <button 
            onClick={handleAccept}
            className="w-full py-2.5 px-4 rounded-lg font-medium border border-current hover:opacity-80 transition-opacity"
          >
            {t("cookie.accept")}
          </button>
          
          <div className="flex gap-3">
            {/* Bouton Refuser */}
            <button 
              onClick={handleDecline}
              className="flex-1 py-2 px-4 rounded-lg border border-current/50 opacity-80 hover:opacity-100 transition-opacity"
            >
              {t("cookie.decline")}
            </button>
            
            {/* Lien Politique */}
            <Link 
              to="/legal" 
              onClick={() => setIsVisible(false)}
              className="flex-1 flex items-center justify-center text-xs opacity-60 hover:opacity-100 underline decoration-current/30"
            >
              {t("cookie.policy")}
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}