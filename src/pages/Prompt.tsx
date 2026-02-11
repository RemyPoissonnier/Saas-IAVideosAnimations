import { useState } from "react";
import { useI18n } from "../i18n";
import ResultVideo from "../components/generator/ResultVideo";
import { useVideoGeneration } from "../components/hooks/videoGenerator";
import PromptTool from "../components/PromptTool";
import { useAuth } from "../context/AuthContext";
import type { OptionsIaRP } from "../api/type";
import { ResultExample } from "../components/ResultExample";
import { PromptHistory } from "../components/PromptHistory";
import Card, { CardBody } from "../components/ui/Card";
import SEO from "../components/SEO";

type PromptProps = {
  onOpenAuth: () => void;
};

export function Prompt({ onOpenAuth }: PromptProps) {
  const { t } = useI18n();

  // 1. État local pour le texte (input)
  const [prompt, setPrompt] = useState<string>(t("prompt.init"));

  const [options, setOptions] = useState<OptionsIaRP>({
    resolution: "1080p",
    aspectRatio: "16:9",
    durationSeconds: "6",
  });

  // 2. Récupération de la logique via notre Hook
  const { generateVideo, loading, data, error } = useVideoGeneration();
  const { currentUser } = useAuth();

  // 3. Handler qui fait le lien
  const handleGenerateClick = () => {
    generateVideo({ prompt, options, userId: currentUser?.uid ?? "" });
  };

  return (
    <div className=" w-full max-w-7xl mx-auto p-4">
      <SEO 
        title={t("prompt.title")} 
        description={t("prompt.subtitle")} 
        url="https://whisker.studio/prompt"
      />
      <div className="flex flex-col md:flex-row gap-4">
        {/* COLONNE GAUCHE : LE GÉNÉRATEUR 
         Il prend toute la largeur si pas de résultat, sinon partage l'espace
         */}
        <div
          className={`transition-all duration-500 ${
            data?.outputUrl || loading ? "md:w-1/2" : "w-full"
          }`}
        >
          <PromptTool
            prompt={prompt}
            setPrompt={setPrompt}
            options={options}
            setOptions={setOptions}
            onGenerate={handleGenerateClick}
            isLoading={loading}
          />
        </div>

        {/* COLONNE DROITE : LE RÉSULTAT 
         S'affiche uniquement si un chargement ou un résultat est présent
         */}
        {loading || data?.outputUrl || error ? (
          <div className="md:w-1/2 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ResultVideo
              isLoading={loading}
              // videoUrl={videoResult}
              videoUrl={data?.outputUrl}
              error={error}
            />
          </div>
        ) : (
          <ResultExample options={options} setOptions={setOptions} />
        )}
      </div>

      {/* HISTORIQUE DES PROMPTS (En dessous des deux colonnes) */}
      <div className="w-full mt-8">
        <Card variant="default" className="w-full">
          <CardBody className="p-4">
            <PromptHistory onSelect={setPrompt} userId={currentUser?.uid} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Prompt;