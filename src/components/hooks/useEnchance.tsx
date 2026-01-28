import { useState, useCallback } from 'react';
import { apiClient } from './apiClient';
import { useI18n } from '../../i18n';
// Importe ton apiClient depuis le dossier où il est défini (ex: src/api/ia.ts ou similaire)

export const useEnhance = () => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const {t} = useI18n()
  const promptEcheance = t("prompt.enhance.text")

  const enhancePrompt = useCallback(async (currentPrompt: string) => {
    if (!currentPrompt.trim()) return null;

    setIsEnhancing(true);
    try {
      // Utilisation de ton format standard apiClient
      // Le endpoint "/enhance" doit être configuré sur ton serveur Node/Docker

      const promptSend : string = promptEcheance + currentPrompt
      const response = await apiClient<{ enhancedPrompt: string }>(
        "/prompt/enhance", 
        "POST", 
        { prompt: promptSend }
      );

      return response.enhancedPrompt;
    } catch (error) {
      console.error("Erreur lors de l'amélioration du prompt:", error);
      return null;
    } finally {
      setIsEnhancing(false);
    }
  }, []);

  return { enhancePrompt, isEnhancing };
};