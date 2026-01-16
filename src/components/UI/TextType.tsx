import React from "react";

// Ajout de 'gradient' à la liste des variants
type Variant = "h1" | "h2" | "h3" | "body" | "caption" | "gradient";

interface TextTypeProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

const TextType: React.FC<TextTypeProps> = ({
  variant = "body",
  children,
  className = "",
  id = "O",
  as,
}) => {
  const styles: Record<Variant, string> = {
    // Styles existants
    h1: "text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6",
    h2: "text-3xl md:text-4xl font-semibold tracking-tight text-gray-800 dark:text-gray-100 mb-4",
    h3: "text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 mb-3",
    body: "text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400",
    caption:
      "text-sm text-gray-500 dark:text-gray-500 uppercase tracking-widest font-semibold",

    // --- NOUVEAU STYLE GRADIENT ANIMÉ ---
    // Note : On utilise des couleurs "Mistral/SaaS" (Orange -> Violet -> Bleu)
    gradient: `
     text-4xl md:text-6xl font-bold tracking-tighter mb-6
      bg-clip-text text-transparent 
      /* On définit manuellement le dégradé pour boucler : Jaune -> Orange -> Jaune */
      bg-[linear-gradient(to_right,#f2b33d,#D95d30,#f2B33D)]
      /* On ajuste la taille à 200% pour que la boucle soit mathématiquement parfaite */
      bg-[length:200%_auto]
      animate-text-gradient
    `,
  };

  // Si c'est 'gradient', on utilise par défaut un h1
  const Component =
    as ||
    (variant === "gradient"
      ? "h1"
      : variant === "body" || variant === "caption"
      ? "p"
      : variant);

  return (
    <Component className={`${styles[variant]} ${className}`} id={id}>
      {children}
    </Component>
  );
};

export default TextType;
