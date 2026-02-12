import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { apiClient } from "./apiClient";
import type { BuyingCardProps } from "../ui/BuyingCard";
import type { coinType } from "../ui/Coin";

/**
 * Interface representing the pricing structure from Polar.sh.
 */
export interface PolarPrice {
  id: string;
  price_amount: number;
  price_currency: string;
  type: "recurring" | "one_time";
  recurring_interval?: "month" | "year";
}

/**
 * Interface for expected metadata fields on Polar products.
 */
export interface PolarMetadata {
  coin?: string;
  token?: string | number;
  description?: string;
  [key: string]: any;
}

/**
 * Interface representing a product item returned by the Polar.sh API.
 */
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
  metadata: PolarMetadata;
}

/**
 * Interface for the paginated response from Polar.sh API.
 */
export interface PolarApiResponse {
  items: PolarProductItem[];
  pagination: {
    total_count: number;
    max_page: number;
  };
}

/**
 * Hook to manage Polar.sh products and checkout operations.
 * Fetches data directly from Polar.sh API and maps it to BuyingCard props,
 * leveraging product metadata for enhanced configuration.
 * 
 * @param {string} organizationId - The Polar organization ID to fetch products for.
 * @returns {Object} Product data, loading states, and checkout functions.
 */
export const usePolar = (organizationId?: string) => {
  const { currentUser, getToken } = useAuth();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  /**
   * useQuery fetches all products information DIRECTLY from Polar.sh.
   * Maps Polar items to BuyingCardProps format using metadata for specific fields.
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
      return data.items.map((item: PolarProductItem) => {
        const metadata = item.metadata || {};
        
        // 1. Extract and normalize token amount from metadata
        const tokenAmount = metadata.token ? Number(metadata.token) : 0;
        
        // 2. Determine coinType from metadata.coin or fallback to name-based logic
        let coin: coinType = "bronze";
        const metaCoin = metadata.coin?.toLowerCase();
        
        if (metaCoin === "diamond" || metaCoin === "diamant") coin = "diamond";
        else if (metaCoin === "gold" || metaCoin === "or") coin = "gold";
        else if (metaCoin === "silver" || metaCoin === "argent") coin = "silver";
        else if (metaCoin === "bronze") coin = "bronze";
        else {
          // Fallback to name-based detection if metadata is missing
          const nameLower = item.name.toLowerCase();
          if (nameLower.includes("diamond")) coin = "diamond";
          else if (nameLower.includes("gold")) coin = "gold";
          else if (nameLower.includes("silver")) coin = "silver";
        }

        // 3. Extract description from metadata (i18n path) or fallback to item description
        const displayDescription = metadata.description || item.description || "";

        // 4. Calculate price from cents to decimal
        const mainPrice = item.prices[0];
        const price = mainPrice ? mainPrice.price_amount / 100 : 0;

        return {
          polarId: item.id,
          productName: item.name,
          description: displayDescription,
          price: price,
          imageUrl: item.medias && item.medias.length > 0 ? item.medias[0].public_url : undefined,
          isSubcription: item.is_recurring,
          coinType: coin,
          isActive: false,
          metadata: {
            token: tokenAmount,
            coin: coin,
            description: metadata.description || ""
          }
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
   * 
   * @param {string} productId - The ID of the product to purchase.
   * @param {string | null} discountId - Optional discount ID to apply.
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