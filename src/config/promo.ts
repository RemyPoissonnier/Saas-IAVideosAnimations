// src/config/promo.ts

export const PROMO_CONFIG = {
  // Active ou désactive la bannière globalement
  isActive: true, 
  
  // La date de fin de la promo (Format ISO)
  endDate: "2026-02-20T23:59:59", 
  
  // Le pourcentage (pour l'affichage)
  discountPercent: 30,
  
  // Le code promo (optionnel, pour affichage)
  code: "VIO30",

  // idDiscount
  discountId : "fd21a68b-b71c-4fa1-b507-fa19e14d87e0",
  
  // Vers quelle page redirige le clic (ex: la page Tokens)
  linkTo: "/tokens",
  
  // Couleur de fond (pour pouvoir changer selon la saison : Noël, Black Friday...)
  backgroundColor: "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600",
};