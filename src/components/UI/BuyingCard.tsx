import React from "react";
import Card, { CardBody } from "./Card";
import TextType from "./TextType";
import Button from "./Button";
import Pill from "./Pill";
import Coin, { type coinType } from "./Coin";

type propBuyCard = {
    coinType? : coinType
    onClick? : () => void
    isActive : boolean
    sold? : number
    isSubcription?: boolean
    cost : number
    title : string
    text : string
}
// TODO I18N
export const BuyingCard = (props : propBuyCard) => {
  return (
    <Card variant="default" className={`h-full relative overflow-visible ${props.isActive ? "mt-3" : ""}`}>
        {props.isActive ? <Pill isActive={false} className="absolute -top-3 left-1/2 -translate-x-1/2" label="current plan"></Pill> : <></>}
      <CardBody className="flex flex-col">
        <Coin type={props.coinType ?? "bronze"}></Coin>
        <TextType variant="h3" className="text-center">{props.title}</TextType>
        <TextType variant="gradient" className="text-center">{props.cost} $</TextType>
        <TextType variant="body" className="mt-2">
          {props.text}
        </TextType>
        <Button className="justify-center mt-3"
        onClick={props.onClick}
        variant={props.isActive ? "secondary" : "primary"} >{props.isSubcription ? (props.isActive ? "Change subcription" : "Subscribe" ) : "Purchase"}</Button>
      </CardBody>
    </Card>
  );
};
