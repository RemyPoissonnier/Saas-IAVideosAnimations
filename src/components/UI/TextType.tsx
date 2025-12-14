import React from 'react';

// Ajout de 'gradient' à la liste des variants
type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'gradient';

interface TextTypeProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const TextType: React.FC<TextTypeProps> = ({ 
  variant = 'body', 
  children, 
  className = '', 
  as 
}) => {

  const styles: Record<Variant, string> = {
    // Styles existants
    h1: "text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6",
    h2: "text-3xl md:text-4xl font-semibold tracking-tight text-gray-800 dark:text-gray-100 mb-4",
    h3: "text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 mb-3",
    body: "text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400",
    caption: "text-sm text-gray-500 dark:text-gray-500 uppercase tracking-widest font-semibold",
    
    // --- NOUVEAU STYLE GRADIENT ANIMÉ ---
    // Note : On utilise des couleurs "Mistral/SaaS" (Orange -> Violet -> Bleu)
    gradient: `
      text-4xl md:text-6xl font-bold tracking-tighter mb-6
      bg-clip-text text-transparent 
      bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500
      animate-text-gradient 
      bg-[length:300%_auto]
    `,
  };

  // Si c'est 'gradient', on utilise par défaut un h1
  const Component = as || (variant === 'gradient' ? 'h1' : variant === 'body' || variant === 'caption' ? 'p' : variant);

  return (
    <Component className={`${styles[variant]} ${className}`}>
      {children}
    </Component>
  );
};

export default TextType;