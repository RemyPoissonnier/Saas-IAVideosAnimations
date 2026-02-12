import { useEffect } from "react";
import Card, { CardBody } from "./Card";
import TextType from "./TextType";
import Button from "./Button";
import Pill from "./Pill";
import Coin, { type coinType } from "./Coin";
import { useI18n } from "../../i18n";
import { useCurrency } from "../hooks/useCurrency";

/**
 * 1. Props Definition: Define BuyingCardProps interface with
 * productName, price, description, imageUrl, and extra functional props.
 */
export interface BuyingCardProps {
  productName: string;
  price: number;
  description: string;
  imageUrl?: string;
  coinType?: coinType;
  onClick?: () => void;
  isActive?: boolean;
  sold?: number; // Decimal value expected (e.g., 0.30 for 30%)
  isSubcription?: boolean;
  polarId: string;
  metadata?: {
    token: number; // number of token, to converte to number
    coin: string; // name of the coin, if is silver / gold / bronze / diamond
    description: string; //the path of i18n
  };
}

/**
 * BuyingCard Component
 * Displays a product or subscription plan with its information and a "Buy Now" button.
 */
export const BuyingCard = (props: BuyingCardProps) => {
  const { t } = useI18n();
  const { convertPrice, currencySymbol, isLoading } = useCurrency();

  // Convert price based on locale (USD -> EUR if needed)
  const convertedPrice = convertPrice(props.price);

  // Discount calculation logic using converted price
  const hasDiscount = props.sold !== undefined && props.sold > 0;
  const discountValue = hasDiscount ? convertedPrice * props.sold! : 0;
  const finalPrice = convertedPrice - discountValue;

  const displayPrice = Number.isInteger(finalPrice)
    ? finalPrice
    : finalPrice.toFixed(2);
  const displayOriginalPrice = Number.isInteger(convertedPrice)
    ? convertedPrice
    : convertedPrice.toFixed(2);

  // Determine button label
  const buttonLabel = props.isSubcription
    ? props.isActive
      ? t("pricing.changeSub")
      : t("pricing.subscribe")
    : t("pricing.purchase");

  return (
    /**
     * 2. Card Structure: Implement a div with Tailwind CSS classes for layout and styling.
     * (Wrapped in our Card component for theme consistency)
     */
    <Card
      variant="default"
      className={`h-full relative overflow-visible transition-all duration-300 hover:scale-[1.02] ${
        props.isActive
          ? "mt-3 border-indigo-500 shadow-lg shadow-indigo-500/20"
          : ""
      }`}
    >
      {/* 4. Action Button: Badge for current plan */}
      {props.isActive && (
        <Pill
          isActive={false}
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
          label={t("pricing.currentPlan") || "current plan"}
        />
      )}

      {/* Promo Badge */}
      {hasDiscount && !props.isActive && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-sm">
          -{Math.round(props.sold! * 100)}%
        </div>
      )}

      <CardBody className="h-full flex flex-col p-6">
        {/* 3. Image Display: Use <img> tag if imageUrl is provided, otherwise fallback to Coin icon */}
        <div className="flex justify-center mb-4 min-h-[80px] items-center">
          {props.imageUrl ? (
            <img
              src={props.imageUrl}
              alt={props.productName}
              className="w-20 h-20 object-contain rounded-lg shadow-sm"
            />
          ) : (
            <Coin type={(props.metadata?.coin as coinType) ?? "bronze"} />
          )}
        </div>

        {/* 4. Product Info: Display productName */}
        <TextType
          variant="h3"
          className="text-center mt-2 font-bold line-clamp-1"
        >
          {props.productName}
        </TextType>

        {/* Display Token Amount if available in metadata */}
        {props.metadata?.token > 0 && (
          <TextType
            variant="body"
            className="text-center text-indigo-500 font-semibold text-sm"
          >
            {props.metadata?.token.toLocaleString()} Tokens
          </TextType>
        )}

        {/* 4. Product Info: Display price with optional discount styling */}
        <div className="flex flex-col items-center my-3 min-h-[60px] justify-center">
          {isLoading ? (
            <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
          ) : hasDiscount ? (
            <>
              <TextType
                variant="body"
                className="line-through text-gray-400 text-sm mb-[-5px]"
              >
                {displayOriginalPrice} {currencySymbol}
              </TextType>
              <TextType
                variant="gradient"
                className="text-center text-3xl font-bold"
              >
                {displayPrice} {currencySymbol}
              </TextType>
            </>
          ) : (
            <TextType
              variant="gradient"
              className="text-center text-3xl font-bold"
            >
              {displayPrice} {currencySymbol}
            </TextType>
          )}
        </div>

        {/* 4. Product Info: Display description */}
        <TextType
          variant="body"
          className="mt-2 text-center text-gray-500 mb-6 flex-grow text-sm leading-relaxed"
        >
          {props.metadata?.description
            ? t(props.metadata.description as any)
            : props.description}
        </TextType>

        {/* 5. Action Button: Include a "Buy Now" button with an onClick handler */}
        <Button
          className="w-full mt-auto font-bold py-3"
          onClick={props.onClick}
          variant={props.isActive ? "secondary" : "primary"}
        >
          {buttonLabel}
        </Button>
      </CardBody>
    </Card>
  );
};
