import React, { type ButtonHTMLAttributes } from 'react';

// Définition des variantes et tailles
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  
  // 1. Base Styles : Forme, Flexbox, Transition, Police
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 rounded-full tracking-tight";

  // 2. Tailles
  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-semibold",
  };

  // 3. Variantes (Basées sur tes variables Tailwind 'accent', 'surface', etc.)
  const variantStyles: Record<ButtonVariant, string> = {
    // Primary : Fond Accent (Jaune/Doré), Texte Noir/Contrasté
    primary: "bg-accent hover:bg-accent-strong text-black shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-transparent",
    
    // Secondary : Fond Surface (Gris léger/Sombre), Texte normal
    secondary: "bg-surface hover:bg-surface-strong text-text border border-border hover:border-accent/50",
    
    // Outline : Fond transparent, Bordure visible
    outline: "bg-transparent border border-border text-text hover:border-accent hover:text-accent",
    
    // Ghost : Juste le texte (pour les menus ou actions secondaires)
    ghost: "bg-transparent text-muted hover:text-text hover:bg-surface/50",

    // Glass : Effet verre dépoli (top pour les overlays vidéo)
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
  };

  return (
    <button
      className={`
        ${baseStyles} 
        ${sizeStyles[size]} 
        ${variantStyles[variant]} 
        ${isLoading ? 'opacity-80 cursor-wait' : ''} 
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Gestion de l'état de chargement */}
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}

      {/* Affichage des icônes et du texte */}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;