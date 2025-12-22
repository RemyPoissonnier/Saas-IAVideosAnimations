import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/ui/Button';
// J'importe tes composants UI s'ils sont disponibles, sinon je mets du Tailwind standard
// Tu peux décommenter la ligne suivante si tu veux utiliser ton bouton existant :
// import Button from '../components/Button'; 

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const checkoutId = searchParams.get('checkout_id');

  // Optionnel : Un petit effet de "confettis" ou de succès au chargement
  useEffect(() => {
    // Tu pourrais recharger les infos utilisateur ici si besoin
    // ex: auth.reloadUser() pour mettre à jour le solde de tokens affiché
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100 transform transition-all hover:scale-[1.01]">
        
        {/* Cercle animé avec coche verte */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-short">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Paiement Réussi !</h1>
        
        <p className="text-slate-600 mb-8 text-lg">
          Merci pour votre achat. Vos tokens ont été crédités sur votre compte.
          <br />
          <span className="text-sm text-slate-400 mt-2 block">
            Prêt à générer des vidéos incroyables ?
          </span>
        </p>

        {/* Affichage discret de l'ID de transaction pour rassurer */}
        {checkoutId && (
          <div className="mb-8 py-2 px-4 bg-slate-50 rounded-lg border border-slate-200 inline-block">
            <p className="text-xs text-slate-400 font-mono">
              Transaction ID : <span className="text-slate-600">{checkoutId.slice(0, 18)}...</span>
            </p>
          </div>
        )}

        {/* Bouton d'action principal */}
        <Button 
          onClick={() => navigate('/')}
          className="w-full font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all transform active:scale-95"
        >
          Retourner au Générateur
        </Button>

      </div>
    </div>
  );
}