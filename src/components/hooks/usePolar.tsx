import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { apiClient } from "./apiClient";
import type { BuyingCardProps } from "../ui/BuyingCard";
import type { coinType } from "../ui/Coin";

export interface PolarPrice {
  id: string;
  price_amount: number;
  price_currency: string;
  type: "recurring" | "one_time";
  recurring_interval?: "month" | "year";
}

export interface PolarProductItem {
  id: string;
  name: string;
  description: string | null;
  is_recurring: boolean;
  is_archived: boolean;
  organization_id: string;
  prices: PolarPrice[];
  medias: Array<{
    id: string;
    public_url: string;
  }>;
  metadata: Record<string, any>;
}

export interface PolarApiResponse {
  items: PolarProductItem[];
  pagination: {
    total_count: number;
    max_page: number;
  };
}

/**
 * Hook to manage Polar.sh products and checkout operations.
 * Fetches data DIRECTLY from Polar.sh API and maps it to BuyingCard props.
 */
export const usePolar = (organizationId?: string) => {
  const { currentUser, getToken } = useAuth();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  /**
   * useQuery fetches all products information DIRECTLY from Polar.sh.
   * Maps Polar items to BuyingCardProps format.
   */
  const { data: products, isLoading, error, refetch } = useQuery<BuyingCardProps[]>({
    queryKey: ["polar-products", organizationId],
    queryFn: async () => {
      if (!organizationId) return [];
      
      const token = import.meta.env.VITE_POLAR_ACCESS_TOKEN;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      
      const response = await fetch(
        `https://api.polar.sh/api/v1/products/?organization_id=${organizationId}`,
        { headers }
      );
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Polar API Unauthorized: Please check your VITE_POLAR_ACCESS_TOKEN in .env");
        }
        throw new Error(`Failed to fetch from Polar: ${response.statusText}`);
      }
      
      const data: PolarApiResponse = await response.json();
      
      // Map Polar products to our UI Card structure (BuyingCardProps)
      return data.items.map((item) => {
        const mainPrice = item.prices[0];
        // Convert cents to decimal (e.g., 3998 -> 39.98)
        const price = mainPrice ? mainPrice.price_amount / 100 : 0;

        // Logic to determine coinType from name or metadata
        let coin: coinType = "bronze";
        const nameLower = item.name.toLowerCase();
        if (nameLower.includes("diamant") || nameLower.includes("diamond")) coin = "diamond";
        else if (nameLower.includes("gold") || nameLower.includes("or")) coin = "gold";
        else if (nameLower.includes("silver") || nameLower.includes("argent")) coin = "silver";

        return {
          polarId: item.id,
          productName: item.name,
          description: item.description || "",
          price: price,
          imageUrl: item.medias && item.medias.length > 0 ? item.medias[0].public_url : undefined,
          isSubcription: item.is_recurring,
          coinType: coin,
          isActive: false, 
        };
      });
    },
    enabled: !!organizationId,
    staleTime: 1000 * 60 * 60,
  });

  /**
   * getProduct returns all items information retrieved from Polar.
   */
  const getProduct = () => {
    return products || [];
  };

  /**
   * Initiates a Polar checkout session.
   */
  const createCheckout = async (productId: string, discountId?: string | null) => {
    if (!currentUser) {
      throw new Error("Authentication required to perform checkout");
    }

    setIsCheckoutLoading(true);
    try {
      const token = await getToken();
      const response = await apiClient<{ url: string }>(
        "/polar/create-checkout",
        "POST",
        {
          productId,
          discountId,
          userId: currentUser.uid,
        },
        token
      );

      if (response.url) {
        window.location.href = response.url;
      }
      return response;
    } catch (err) {
      console.error("Failed to create Polar checkout:", err);
      throw err;
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return {
    products: products || [],
    isLoading,
    isCheckoutLoading,
    error,
    getProduct,
    createCheckout,
    refetch,
  };
};