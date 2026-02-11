import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { useAuth } from "../../context/AuthContext";

export type SubscriptionData = {
  isActive: boolean;
  tier?: string;
  planName?: string;
  renewalDate?: string;
  cancelAtPeriodEnd?: boolean;
};

export const useSubscription = () => {
  const { currentUser, getToken } = useAuth();

  const query = useQuery({
    // 🔑 La clé unique du cache. Si l'email change, on refetch.
    queryKey: ['subscription', currentUser?.email],
    
    // 🛑 On ne lance la requête que si l'user est connecté
    enabled: !!currentUser, 

    // ⚡ La fonction de fetch
    queryFn: async () => {
      const token = await getToken();
      // Ton apiClient gère déjà les erreurs, c'est parfait
      return await apiClient<SubscriptionData>("/subscription/me", "GET", undefined, token);
    },
    
    // 🧠 Optimisation : Si l'API échoue (401/500), on renvoie une valeur par défaut "Safe"
    initialData: undefined,
  });

  return {
    subscription: query.data || { isActive: false }, // Valeur par défaut si pas chargé
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch // Tu peux appeler ça manuellement après un paiement !
  };
};