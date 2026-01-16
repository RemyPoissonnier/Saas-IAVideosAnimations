import type { ReactNode } from "react";
import Card, { CardBody, CardFooter, CardHeader } from "../ui/Card";
import TextType from "../ui/TextType";

interface LegalSectionProps {
  title: string;
  children: ReactNode;
  disclaimer?: string;
  id?: string;
}

export function LegalSectionLayout({
  title,
  children,
  disclaimer,
  id,
}: LegalSectionProps) {
  return (
    <Card id={id} className="flex flex-col p-4">
      {/* Utilisation de TextType pour le titre de la section */}
      <CardHeader>
        <TextType variant="h2">{title}</TextType>
      </CardHeader>
      <CardBody className="space-y-4  text-base leading-relaxed`">
        {/* Le contenu légal reste en JSX standard pour supporter le Gras/Listes */}
        {children}
      </CardBody>

      <CardFooter className="mt-4 pt-4 border-t border-border/40 text-xs italic opacity-70">
        {disclaimer && <TextType>{disclaimer}</TextType>}
      </CardFooter>
    </Card>
  );
}
