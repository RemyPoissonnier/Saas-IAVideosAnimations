import { useState, useEffect } from "react";
import TextType from "../components/ui/TextType";
import { useI18n } from "../i18n";
import { BuyingCard } from "../components/ui/BuyingCard";
import { arrCoint, arrSubs, arrProdTest } from "../components/hooks/products";
import { useAuth } from "../context/AuthContext";
// On imagine que tu as créé ce fichier comme convenu
import { PROMO_CONFIG } from "../config/promo"; 
import { SubscriptionInfo } from "../components/ui/SubscriptionInfo";

export function Tokens() {
  const { t } = useI18n(); 
  const { currentUser } = useAuth(); 
  
  // État pour le solde calculé
  const [currentSold, setCurrentSold] = useState(0);
  const [discountId, setDiscountId] = useState<string | null>(null);

  // --- LOGIQUE AUTOMATIQUE DE SOLDE ---
  useEffect(() => {
    if (!PROMO_CONFIG.isActive) {
      setCurrentSold(0);
      return;
    }
    
    const now = new Date();
    const end = new Date(PROMO_CONFIG.endDate);
    
    if (now < end) {
      // Conversion du pourcentage (ex: 50) en décimal (0.5) pour le composant BuyingCard
      setCurrentSold(PROMO_CONFIG.discountPercent / 100);
      setDiscountId(PROMO_CONFIG.discountId);
    } else {
      setCurrentSold(0);
    }
  }, []);

  const handleBuy = async (productId: string, discountId: string | null) => {
    if (!currentUser) {
      alert("Connectez-vous d'abord !"); // Idéalement, ouvrir la modale de login ici
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: productId,
          discountId: discountId,
          userId: currentUser.uid 
        })
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Erreur checkout:", error);
    }
  }

  return (
    <div className="space-y-8 px-4 md:px-6 justify-center pb-10">
      
      {/* BANNIÈRE PROMO (s'affiche uniquement si solde actif) */}
      {currentSold > 0 && (
        <div className={`w-full py-3 text-center text-white font-bold rounded-lg shadow-md ${PROMO_CONFIG.backgroundColor}`}>
           🔥 OFFRE SPÉCIALE : -{PROMO_CONFIG.discountPercent}% avec le code {PROMO_CONFIG.code} !
        </div>
      )}



      {/* Utilisation du composant extrait */}
      <SubscriptionInfo />

      <div className="my-8">
         <TextType variant="gradient" className="text-center text-3xl mb-6">
          Simple and transparent pricing
        </TextType>
      </div>

      {/* SECTION PRODUITS PRINCIPALE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* On mappe sur arrProdTest qui semble être ta liste principale pour le moment */}
        {arrProdTest.map((product, index) => (
          <BuyingCard 
            key={index} 
            {...product} 
            // On injecte le solde calculé automatiquement
            sold={currentSold} 
            onClick={() => handleBuy(product.polarId, discountId)}
          />
        ))}
      </div>

      {/* SECTION SECONDAIRE (Hidden pour l'instant comme dans ton code) */}
      <div className="hidden grid-cols-3 gap-4"> 
        <div className="flex flex-col gap-2">
          {arrCoint.map((t, index) => (
            <BuyingCard key={index} {...t} sold={currentSold} />
          ))}
        </div>

        {arrSubs.map((t, index) => (
          <BuyingCard key={index} {...t} sold={currentSold} />
        ))}
      </div>
    </div>
  );
}

export default Tokens;