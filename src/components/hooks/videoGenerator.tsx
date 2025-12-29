// src/hooks/useVideoGeneration.ts
import { useState } from 'react';
import { sendPrompt, type IaRequestPayload } from '../../api/ia';

export const useVideoGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateVideo = async (prompt: string) => {
    
    setLoading(true);
    setError(null);
    setVideoUrl(null);

    try {
      // Simulation de l'appel API (remplace par ton appel réel)
      const result = await sendPrompt(prompt); 
      // On suppose que l'API renvoie { url: "..." } ou directement l'URL
      setVideoUrl(result.outputUrl ?? ""); 
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de la création de la vidéo.");
    } finally {
      setLoading(false);
    }
  };

  return {
    generateVideo,
    loading,
    videoUrl,
    error
  };
};