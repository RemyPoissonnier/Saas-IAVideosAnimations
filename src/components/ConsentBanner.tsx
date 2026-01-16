import { useState, useEffect } from 'react';
import { getAnalytics, setAnalyticsCollectionEnabled } from "firebase/analytics";

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setIsVisible(true);
    } else if (consent === "granted") {
      activateTracking();
    }
  }, []);

  const activateTracking = () => {
    const analytics = getAnalytics();
    // On réactive Firebase uniquement si consentement
    setAnalyticsCollectionEnabled(analytics, true);
    console.log("Analytics activés"); // Pour tes tests
  };

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "granted");
    activateTracking();
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "denied");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-[400px] z-50 animate-fade-in-up">
      {/* Design inspiré de Mistral AI : Bordure fine, fond sombre/sable, ombre diffuse */}
      <div className="bg-[#0f172a] border border-orange-500/30 p-6 rounded-lg shadow-2xl text-slate-200 font-sans">
        <h3 className="text-lg font-semibold text-white mb-2">Gestion des données</h3>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          Nous respectons votre vie privée. Conformément aux réglementations européennes, 
          nous demandons votre accord pour utiliser des cookies à des fins d'analyse 
          et de performance via nos outils IA.
        </p>
        
        <div className="flex flex-col gap-3">
          {/* Bouton Principal - Style "Mistral Orange" */}
          <button 
            onClick={handleAccept}
            className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded transition-colors duration-200"
          >
            Tout accepter
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={handleDecline}
              className="flex-1 py-2 px-4 border border-slate-600 hover:border-slate-500 text-slate-300 text-sm rounded transition-colors"
            >
              Refuser
            </button>
            <button className="flex-1 py-2 px-4 text-slate-500 hover:text-slate-300 text-xs underline decoration-slate-700">
              Politique
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}