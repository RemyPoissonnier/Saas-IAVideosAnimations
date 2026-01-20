// src/hooks/useVideoGeneration.ts
import { useState } from 'react';
import { sendIaRequest } from '../../api/ia';
import type { IaResponse, IaRequestPayload } from '../../api/type';
// 👇 Correction : Import depuis 'ia' (vérifie le chemin selon ton dossier)

export const useVideoGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IaResponse | null>(null); // On garde tout (id, status, url...)
  const [error, setError] = useState<string | null>(null);

  const generateVideo = async (request: IaRequestPayload) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      console.log("🚀 Hook: Envoi de la demande...", request);
      
      // Appel à ta fonction API existante
      const result = await sendIaRequest(request);
      
      console.log("✅ Hook: Résultat reçu", result);
      setData(result); // On stocke le résultat (ex: { requestId: '...', status: 'queued' })
      
      return result; // On retourne l'objet pour que le composant puisse l'utiliser tout de suite
    } catch (err: any) {
      console.error("❌ Hook: Erreur", err);
      const msg = err.message || "Une erreur est survenue lors de la création de la vidéo.";
      setError(msg);
      throw err; // On relance l'erreur si le composant veut la gérer
    } finally {
      setLoading(false);
    }
  };

  return {
    generateVideo,
    loading,
    data,    // Contient { requestId, status, outputUrl, etc. }
    error
  };
};