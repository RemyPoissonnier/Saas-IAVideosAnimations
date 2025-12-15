import React from 'react';

type PillVariant = 'default' | 'accent' | 'outline' | 'glass' | 'success' | 'warning';
type PillSize = 'xs' | 'sm' | 'md';

interface PillProps {
  label: string;
  variant?: PillVariant;
  size?: PillSize;
  icon?: React.ReactNode;      // Icône à gauche (ex: un point, une étoile)
  onRemove?: () => void;       // Si présent, affiche une croix pour supprimer
  onClick?: () => void;        // Si présent, le pill devient cliquable (filtre)
  className?: string;
  isActive?: boolean;          // Pour les filtres (état sélectionné)
}

const Pill: React.FC<PillProps> = ({
  label,
  variant = 'default',
  size = 'sm',
  icon,
  onRemove,
  onClick,
  className = '',
  isActive = false,
}) => {

  // 1. Styles de base (Forme, Font, Flex)
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 border";
  
  // 2. Gestion du curseur (Interactif ou pas ?)
  const interactionStyles = (onClick || onRemove) 
    ? "cursor-pointer hover:scale-105 active:scale-95 selection:bg-transparent" 
    : "cursor-default";

  // 3. Tailles
  const sizeStyles: Record<PillSize, string> = {
    xs: "px-2 py-0.5 text-[10px] gap-1",
    sm: "px-3 py-1 text-xs gap-1.5",
    md: "px-4 py-1.5 text-sm gap-2",
  };

  // 4. Variantes de couleurs
  // Note : J'utilise tes variables CSS (surface, accent, etc.)
  const variantStyles: Record<PillVariant, string> = {
    // Default : Gris discret (parfait pour les tags techniques)
    default: isActive 
      ? "bg-text text-bg border-text" // Inversé si actif
      : "bg-surface text-muted border-border hover:border-text/30",
    
    // Accent : Mise en avant (ex: "Nouveau")
    accent: "bg-accent/10 text-accent-strong border-accent/20",

    // Outline : Très léger, fond transparent
    outline: isActive
      ? "bg-accent text-white border-accent"
      : "bg-transparent text-text border-border hover:border-accent hover:text-accent",

    // Glass : Pour mettre sur une vidéo
    glass: "bg-white/10 backdrop-blur-md border-white/20 text-white shadow-sm",

    // Status Colors (pour l'état des générations vidéo)
    success: "bg-green-500/10 text-green-600 border-green-500/20",
    warning: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  };

  return (
    <div 
      className={`
        ${baseStyles} 
        ${sizeStyles[size]} 
        ${variantStyles[variant]} 
        ${interactionStyles} 
        ${className}
      `}
      onClick={onClick}
    >
      {/* Icône à gauche (optionnel) */}
      {icon && <span className="opacity-80 flex items-center justify-center">{icon}</span>}
      
      {/* Texte du Pill */}
      <span>{label}</span>

      {/* Bouton de suppression (optionnel) */}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Empêche de déclencher le onClick du parent
            onRemove();
          }}
          className="ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Pill;