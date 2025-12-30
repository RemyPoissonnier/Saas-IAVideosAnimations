import { useState } from "react";
import { useI18n } from "../i18n";
import ResultVideo from "../components/generator/ResultVideo";
import { useVideoGeneration } from "../components/hooks/videoGenerator";
import PromptTool from "../components/PromptTool";
import { useAuth } from "../context/AuthContext";

type PromptProps = {
  onOpenAuth: () => void;
};

export function Prompt({ onOpenAuth }: PromptProps) {
  const { t } = useI18n();

  // 1. État local pour le texte (input)
  const [prompt, setPrompt] = useState("");

  // 2. Récupération de la logique via notre Hook
  const { generateVideo, loading, videoUrl, error } = useVideoGeneration();
  const {currentUser} = useAuth()

  // 3. Handler qui fait le lien
  const handleGenerateClick = () => {
    generateVideo({prompt , userId: currentUser?.uid ?? ""});
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-7xl mx-auto p-4">
      {/* COLONNE GAUCHE : LE GÉNÉRATEUR 
         Il prend toute la largeur si pas de résultat, sinon partage l'espace
      */}
      <div
        className={`transition-all duration-500 ${
          videoUrl || loading ? "md:w-1/2" : "w-full"
        }`}
      >
        <PromptTool
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={handleGenerateClick}
          isLoading={loading}
        />
      </div>

      {/* COLONNE DROITE : LE RÉSULTAT 
         S'affiche uniquement si un chargement ou un résultat est présent
      */}
      {(loading || videoUrl || error ) && (
        <div className="md:w-1/2 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ResultVideo
            isActive={true} // Il est actif puisqu'on l'affiche conditionnellement
            isLoading={loading}
            // videoUrl={videoResult}
            videoUrl={videoUrl}
            error={error}
          />
        </div>
      )}
    </div>
  );
}

export default Prompt;
