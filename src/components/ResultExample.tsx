import { useState } from "react";
import { Smartphone, Monitor } from "lucide-react";
import TextType from "./ui/TextType";
import type { OptionsIaRP } from "../api/type";
import { VideoCarrousel } from "./VideoCarrousel";
import { ExampleVideos } from "./hooks/exempleVideo";
import { useI18n } from "../i18n";

// On définit les ratios possibles comme un type strict
export type AspectRatio = "16:9" | "9:16";

export interface VideoPath {
  format: AspectRatio;
  path: string;
}

export interface ExampleVideo {
  id: number;
  // Utilisation d'une structure plus plate pour faciliter l'accès
  title: string;
  prompt: string;
  // On stocke les chemins dans un objet pour un accès direct : paths['16:9']
  paths: Record<AspectRatio, string>; 
  thumbnail?: string;
}

// Pour tes props de composant
type ResultExampleProp = {
  options: OptionsIaRP;
  setOptions: (arg: OptionsIaRP) => void;
};

export function ResultExample({ options, setOptions }: ResultExampleProp) {
  const {t} = useI18n()
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex flex-col gap-6 w-full lg:max-w-md">
      {/* Header & Sélecteur de Format */}
      <div className="flex items-center justify-between">
        <TextType variant="h3">{t('showcase')}</TextType>

        <div className="flex p-1 rounded-xl">
          <button
            onClick={() => {
              setOptions({ ...options, aspectRatio: "9:16" });
              setCurrentIndex(0);
            }}
            className={`p-2 rounded-lg transition-all ${options.aspectRatio === "9:16" ? "bg-white shadow-sm text-orange-500" : "text-slate-400"}`}
            title="Format TikTok"
          >
            <Smartphone size={16} />
          </button>
          <button
            onClick={() => {
              setOptions({ ...options, aspectRatio: "16:9" });
              setCurrentIndex(0);
            }}
            className={`p-2 rounded-lg transition-all ${options.aspectRatio === "16:9" ? "bg-white shadow-sm text-orange-500" : "text-slate-400"}`}
            title="Format YouTube"
          >
            <Monitor size={16} />
          </button>
        </div>
      </div>

      {/* Carrousel */}
      <VideoCarrousel
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        videos={ExampleVideos}
        options={options}
      />

      {/* Dots Indicateurs */}
      <div className="flex justify-center gap-1.5">
        {ExampleVideos.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-orange-500" : "w-1.5 bg-slate-200"}`}
          />
        ))}
      </div>
    </div>
  );
}
