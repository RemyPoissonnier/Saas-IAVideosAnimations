import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Smartphone,
  Monitor,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import TextType from "./ui/TextType";
import type { OptionsIaRP } from "../api/type";
import Card from "./ui/Card";

// Types pour la gestion des formats
type VideoFormat = "9:16" | "16:9";

interface ExampleVideo {
  id: number;
  title: string;
  prompt: string;
  thumbnail: string;
  format: VideoFormat;
}

const EXAMPLES: ExampleVideo[] = [
  {
    id: 1,
    title: "Cinematic Nature",
    prompt:
      "A majestic eagle soaring through a mist-covered canyon, 4k, cinematic lighting.",
    thumbnail:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
    format: "16:9",
  },
  {
    id: 2,
    title: "Urban Cyberpunk",
    prompt:
      "Neon-lit streets of Tokyo after rain, reflections on puddles, futuristic cars.",
    thumbnail:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80",
    format: "9:16",
  },
  // Ajoute d'autres exemples ici...
];

type ResultExampleProp = {
  options: OptionsIaRP;
  setOptions: (arg: OptionsIaRP) => void;
};

export function ResultExample({ options, setOptions }: ResultExampleProp) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtrer les exemples selon le format choisi
  const filteredExamples = EXAMPLES.filter(
    (ex) => ex.format === options.aspectRatio,
  );

  // Auto-play du carrousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredExamples.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [filteredExamples.length]);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % filteredExamples.length);
  const prevSlide = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + filteredExamples.length) % filteredExamples.length,
    );

  return (
    <div className="flex flex-col gap-6 w-full lg:max-w-md">
      {/* Header & Sélecteur de Format */}
      <div className="flex items-center justify-between">
        <TextType variant="h3">
          Showcase
        </TextType>

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
            {/* Vidéo/Image Card */}
            <div
              className={`relative overflow-hidden rounded-2xl bg-slate-900 transition-all duration-500 mx-auto ${
                options.aspectRatio === "9:16"
                  ? "aspect-[9/16] w-[240px]"
                  : "aspect-video w-full"
              }`}
            >
              <img
                src={filteredExamples[currentIndex]?.thumbnail}
                alt="Preview"
                className="object-cover w-full h-full opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                  <Play
                    className="fill-white text-white translate-x-0.5"
                    size={20}
                  />
                </div>
              </div>
            </div>

            {/* Prompt Typing Effect */}
            <Card className=" border p-4 rounded-2xl">
              <span className="text-[10px] font-bold text-orange-500 dark:text-slate-50 uppercase mb-1 block">
                Prompt
              </span>
              <div className="text-sm text-slate-700 leading-relaxed min-h-[3em]">
                <TextType>
                  {filteredExamples[currentIndex]?.prompt}
                </TextType>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Overlays */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-orange-500 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-orange-500 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indicateurs */}
      <div className="flex justify-center gap-1.5">
        {filteredExamples.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-orange-500" : "w-1.5 bg-slate-200"}`}
          />
        ))}
      </div>
    </div>
  );
}
