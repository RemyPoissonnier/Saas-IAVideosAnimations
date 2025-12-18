import React, { useEffect } from "react";
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
  sold?: number;
  isSubcription?: boolean;
  cost: number;
  title: string;
  text: string;
  polarId: string;
};
// TODO I18N
export const BuyingCard = (props: propBuyCard) => {
  // ... dans le composant
  useEffect(() => {
    PolarEmbedCheckout.init();
  }, []);

  // Cette fonction détermine le texte du bouton
  const buttonLabel = props.isSubcription
    ? props.isActive
      ? "Change subscription"
      : "Subscribe"
    : "Purchase";

  // Cette fonction rend le bouton visuel
  const renderButton = () => (
    <Button
      className="justify-center mt-3 w-full" // J'ai ajouté w-full pour qu'il prenne la largeur dans le lien
      onClick={props.onClick} // Si lien Polar, on désactive le onClick React
      variant={props.isActive ? "secondary" : "primary"}
    >
      {buttonLabel}
    </Button>
  );

  return (
    <Card
      variant="default"
      className={`h-full relative overflow-visible${
        props.isActive ? "mt-3" : ""
      }`}
    >
      {props.isActive ? (
        <Pill
          isActive={false}
          className="absolute -top-3 left-1/2 -translate-x-1/2"
          label="current plan"
        ></Pill>
      ) : (
        <></>
      )}
      <CardBody className="flex flex-col">
        <Coin type={props.coinType ?? "bronze"}></Coin>
        <TextType variant="h3" className="text-center">
          {props.title}
        </TextType>
        <TextType variant="gradient" className="text-center">
          {props.cost} $
        </TextType>
        <TextType variant="body" className="mt-2">
          {props.text}
        </TextType>
        {renderButton()}
      </CardBody>
    </Card>
  );
};
