import React from 'react';

// Variantes de style pour s'adapter au contexte (ex: grille de vidéos vs pricing)
type CardVariant = 'default' | 'outline' | 'glass' | 'interactive';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  onClick
}) => {
  
  // Base commune : coins arrondis, transition fluide, gestion du curseur
  const baseStyles = "rounded-xl transition-all duration-300 overflow-hidden";
  const cursorStyles = onClick ? "cursor-pointer active:scale-95" : "";

  // Styles spécifiques inspirés de Mistral
  const variants: Record<CardVariant, string> = {
    // Standard : Fond blanc/noir, ombre légère
    default: "bg-white dark:bg-[#1a1a1a] shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-800",
    
    // Outline : Juste un bord fin, très propre pour les listes techniques
    outline: "bg-transparent border border-gray-300 dark:border-gray-700 hover:border-mistral-accent dark:hover:border-mistral-accent",
    
    // Glass : Pour superposition sur vidéo (effet flouté moderne)
    glass: "bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/20 text-white",
    
    // Interactive : Effet de levée et bordure colorée au survol (Parfait pour sélectionner un template)
    interactive: "bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-orange-400 dark:hover:border-orange-500 hover:-translate-y-1 shadow-sm hover:shadow-xl",
  };

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${cursorStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-0 ${className}`}>
    {children}
  </div>
);

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 mt-auto ${className}`}>
    {children}
  </div>
);

export default Card;