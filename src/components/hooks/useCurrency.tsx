import { useQuery } from "@tanstack/react-query";
import { useI18n } from "../../i18n";

const EXCHANGE_RATE_API = "https://api.exchangerate-api.com/v4/latest/USD";

export const useCurrency = () => {
  const { locale } = useI18n();
  
  // Fetch exchange rates only if locale is NOT 'en' (default USD)
  // We assume base price is always in USD.
  const { data: rates, isLoading } = useQuery({
    queryKey: ["exchange-rates", "USD"],
    queryFn: async () => {
      const res = await fetch(EXCHANGE_RATE_API);
      if (!res.ok) throw new Error("Failed to fetch exchange rates");
      return res.json();
    },
    // Cache for 1 hour
    staleTime: 1000 * 60 * 60,
    enabled: locale !== 'en', 
  });

  const convertPrice = (priceInUSD: number) => {
    // If English, keep USD
    if (locale === 'en') {
      return priceInUSD;
    }

    // If French, try to convert to EUR
    if (locale === 'fr' && rates?.rates?.EUR) {
      return priceInUSD * rates.rates.EUR;
    }

    // Fallback: return original price if rate not loaded yet or unknown locale
    return priceInUSD;
  };

  const currencySymbol = locale === 'fr' ? '€' : '$';

  return {
    convertPrice,
    currencySymbol,
    isLoading: locale !== 'en' && isLoading,
  };
};
