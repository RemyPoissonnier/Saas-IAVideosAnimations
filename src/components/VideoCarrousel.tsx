import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Card from "./ui/Card";
import { Play, ChevronRight, ChevronLeft } from "lucide-react";
import type { ExampleVideo, AspectRatio } from "./ResultExample"; // Assure-toi d'exporter AspectRatio
import type { OptionsIaRP } from "../api/type";
import type { Dispatch, SetStateAction } from "react";
import { useI18n } from "../i18n";

type PropVideoCarrousel = {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  videos: ExampleVideo[];
  options: OptionsIaRP;
};

export const VideoCarrousel = ({
  currentIndex,
  setCurrentIndex,
  videos,
  options,
}: PropVideoCarrousel) => {
  // État pour gérer la lecture
  const [isPlaying, setIsPlaying] = useState(false);
  const {t} = useI18n()

  const nextSlide = () => {
    setIsPlaying(false); // On stop la vidéo au changement
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Récupération du chemin selon le ratio (Utilise ton Record)
  const currentVideo = videos[currentIndex];
  const videoPath = currentVideo?.paths[options.aspectRatio as AspectRatio];

  return (
    <div className="relative overflow-hidden min-h-[400px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${options.aspectRatio}-${currentIndex}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="w-full flex flex-col gap-4"
        >
          {/* Conteneur Vidéo Style Mistral */}
          <div
            className={`relative overflow-hidden rounded-2xl bg-mistral-black transition-all duration-500 mx-auto border-2 border-transparent hover:border-mistral-orange ${
              options.aspectRatio === "9:16"
                ? "aspect-[9/16] w-[240px]"
                : "aspect-video w-full max-w-2xl"
            }`}
          >
            {!isPlaying ? (
              // Mode Miniature
              <>
                <img
                  src={currentVideo?.thumbnail}
                  alt="Preview"
                  className="object-cover w-full h-full opacity-60"
                />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group cursor-pointer z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-mistral-orange transition-all duration-300">
                    <Play
                      className="fill-white text-white translate-x-0.5"
                      size={28}
                    />
                  </div>
                </button>
              </>
            ) : (
              // Mode Lecture Vidéo
              <video
                src={videoPath}
                autoPlay
                controls
                className="w-full h-full object-cover"
                onEnded={() => setIsPlaying(false)}
              >
                votre navigateur ne supporte pas la vidéo.
              </video>
            )}
          </div>

          {/* Prompt Typing Effect */}
          <Card className="border-2 border-mistral-black p-4 rounded-2xl bg-mistral-beige">
            <span className="text-[10px] font-black text-mistral-orange uppercase mb-1 block tracking-widest">
              Prompt
            </span>
            <div className="text-mistral-black font-medium leading-relaxed min-h-[3em] max-h-[100px] overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-[15px]" key={currentIndex}>{t(currentVideo?.prompt as any)}</p>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Overlays */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-3 text-mistral-black hover:text-mistral-orange transition-colors z-20"
      >
        <ChevronLeft size={32} strokeWidth={3} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-mistral-black hover:text-mistral-orange transition-colors z-20"
      >
        <ChevronRight size={32} strokeWidth={3} />
      </button>
    </div>
  );
};