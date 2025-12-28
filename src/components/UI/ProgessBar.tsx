// src/components/UI/ProgressBar.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // Valeur de 0 à 100
  label?: string;   // Texte optionnel (ex: "Rendering...")
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Label et Pourcentage au-dessus de la barre */}
      <div className="flex justify-between mb-2 text-xs uppercase tracking-widest text-gray-400 font-mono">
        <span>{label || "Traitement en cours"}</span>
        <span>{Math.round(progress)}%</span>
      </div>

      {/* Container de la barre (Fond gris sombre) */}
      <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
        {/* Barre animée (Dégradé Mistral : Jaune vers Orange) */}
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;