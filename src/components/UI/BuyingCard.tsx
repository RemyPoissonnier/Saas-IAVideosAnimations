import { useEffect } from "react";
import Card, { CardBody } from "./Card";
import TextType from "./TextType";
import Button from "./Button";
import Pill from "./Pill";
import Coin, { type coinType } from "./Coin";
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";

export type propBuyCard = {
  coinType?: coinType;
  onClick?: () => void;
  isActive?: boolean;
  sold?: number; // Valeur décimale attendue (ex: 0.20 pour 20%) ou pourcentage (voir note en bas)
  isSubcription?: boolean;
  cost: number;
  title: string;
  text: string;
  polarId: string;
};

// TODO I18N
export const BuyingCard = (props: propBuyCard) => {
  useEffect(() => {
    PolarEmbedCheckout.init();
  }, []);

  // Logique de calcul du prix remisé
  const hasDiscount = props.sold !== undefined && props.sold > 0;
  
  // NOTE: Ta formule "cost - (cost * solde)" implique que solde est un décimal (ex: 0.2).
  // Si ton solde est un entier (ex: 20 pour 20%), remplace par : (props.cost * (props.sold! / 100))
  const discountValue = hasDiscount ? props.cost * props.sold! : 0;
  const finalPrice = props.cost - discountValue;

  // Formatage pour éviter les décimales trop longues (optionnel, retire si tu veux des entiers)
  const displayPrice = Number.isInteger(finalPrice) ? finalPrice : finalPrice.toFixed(2);

  // Cette fonction détermine le texte du bouton
  const buttonLabel = props.isSubcription
    ? props.isActive
      ? "Change subscription"
      : "Subscribe"
    : "Purchase";

  // Cette fonction rend le bouton visuel
  const renderButton = () => (
    <Button
      className="justify-center mt-3 w-full"
      onClick={props.onClick}
      variant={props.isActive ? "secondary" : "primary"}
    >
      {buttonLabel}
    </Button>
  );

  return (
    <Card
      variant="default"
      className={`h-full relative overflow-visible ${
        props.isActive ? "mt-3" : ""
      }`}
    >
      {/* Badge "Current Plan" */}
      {props.isActive && (
        <Pill
          isActive={false}
          className="absolute -top-3 left-1/2 -translate-x-1/2"
          label="current plan"
        />
      )}

      {/* Badge "Promo" (Optionnel mais recommandé pour le marketing) */}
      {hasDiscount && !props.isActive && (
        <div className="absolute top-2 right-2 bg-red-500/10 text-red-500 text-xs font-bold px-2 py-1 rounded-full border border-red-500/20">
            -{props.sold! * 100}%
        </div>
      )}

      <CardBody className="flex flex-col">
        <Coin type={props.coinType ?? "bronze"} />
        
        <TextType variant="h3" className="text-center mt-2">
          {props.title}
        </TextType>

        {/* --- ZONE DE PRIX MODIFIÉE --- */}
        <div className="flex flex-col items-center justify-center my-1">
          {hasDiscount ? (
            <>
              {/* Ancien prix barré */}
              <TextType variant="body" className="line-through text-gray-400 text-sm mb-[-5px]">
                {props.cost} $
              </TextType>
              {/* Nouveau prix calculé */}
              <TextType variant="gradient" className="text-center text-3xl font-bold">
                {displayPrice} $
              </TextType>
            </>
          ) : (
            /* Prix standard sans réduction */
            <TextType variant="gradient" className="text-center">
              {props.cost} $
            </TextType>
          )}
        </div>
        {/* ----------------------------- */}

        <TextType variant="body" className="mt-2 text-center text-gray-500">
          {props.text}
        </TextType>
        
        {renderButton()}
      </CardBody>
    </Card>
  );
};