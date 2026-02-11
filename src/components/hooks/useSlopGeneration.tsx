import { useState } from 'react';
import type { IaResponse } from '../../api/type';
import { apiClient } from './apiClient';
import { useAuth } from '../../context/AuthContext';

export interface SlopItem {
  id: number;
  loading: boolean;
  data: IaResponse | null;
  error: string | null;
}

export const useSlopGeneration = () => {
  const [results, setResults] = useState<SlopItem[]>(
    Array.from({ length: 5 }).map((_, i) => ({ id: i, loading: false, data: null, error: null }))
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const { getToken } = useAuth();

  const generateSlop = async (elements: any, userId: string) => {
    setIsGenerating(true);
    setResults(prev => prev.map(item => ({ ...item, loading: true, data: null, error: null })));

    try {
      const token = await getToken();
      const data = await apiClient<IaResponse[]>('/slopGeneration', 'POST', {
        userId,
        elements,
        options: { resolution: "1080p", aspectRatio: "9:16", durationSeconds: "6" }
      }, token);

      setResults(data.map((item, i) => ({
        id: i,
        loading: false,
        data: item,
        error: null
      })));
    } catch (error: any) {
      setResults(prev => prev.map(item => ({ ...item, loading: false, error: error.message })));
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateSlop, results, isGenerating };
};
