// src/hooks/useVideoGeneration.ts
import { useState } from 'react';
import { sendIaRequest } from '../../api/ia';
import type { IaResponse, IaRequestPayload } from '../../api/type';
import { apiClient } from './apiClient';
import { useAuth } from '../../context/AuthContext';

export const useVideoGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IaResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  const generateVideo = async (request: IaRequestPayload) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      console.log("🚀 Hook: Envoi de la demande...", request);
      
      // 1. Appel API (IA Generation)
      const result = await sendIaRequest(request);
      console.log("✅ Hook: Résultat IA reçu", result);

      // 2. Sauvegarde via ton API (dataStorage)
      if (result.outputUrl && request.userId) {
        try {
          console.log("💾 Hook: Sauvegarde via l'API...");
          
          const token = await getToken();
          // On envoie les infos à ton endpoint de sauvegarde
          // L'API s'occupera de télécharger la vidéo et de la stocker proprement
          await apiClient('/save-generation', 'POST', {
            userId: request.userId,
            requestId: result.requestId,
            prompt: request.prompt,
            options: request.options,
            model: result.model,
            outputUrl: result.outputUrl,
            status: result.status
          }, token);

          console.log("📝 Hook: Génération enregistrée par l'API");

          // B. Cache Local (pour une mise à jour instantanée sans rechargement)
          try {
            const CACHE_KEY = "whisker_prompt_history";
            const cached = localStorage.getItem(CACHE_KEY);
            let history = cached ? JSON.parse(cached) : [];
            const historyItem = {
              id: result.requestId,
              prompt: request.prompt,
              createdAt: new Date().toISOString()
            };
            // On ajoute au début et on garde les 10 derniers
            history = [historyItem, ...history.filter((h: any) => h.prompt !== request.prompt)].slice(0, 10);
            localStorage.setItem(CACHE_KEY, JSON.stringify(history));
          } catch (cacheErr) {
            console.warn("⚠️ Erreur lors de la mise à jour du cache history:", cacheErr);
          }

        } catch (saveErr) {
          console.error("⚠️ Erreur lors de la sauvegarde via l'API:", saveErr);
          // On ne bloque pas l'utilisateur car la vidéo est quand même générée
        }
      }
      
      setData(result); 
      return result;

    } catch (err: any) {
      console.error("❌ Hook: Erreur", err);
      const msg = err.message || "Une erreur est survenue lors de la création de la vidéo.";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateVideo,
    loading,
    data,
    error
  };
};
