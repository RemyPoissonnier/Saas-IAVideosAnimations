import Card, { CardBody } from "../components/UI/Card";
import TextType from "../components/UI/TextType";
import { useI18n } from "../i18n";
import { ghostButton, primaryButton } from "../theme/styles";

export function Tokens() {
  const { t } = useI18n();

  return (
    <div className="space-y-8 px-4 md:px-6 justify-center">
      <TextType variant="gradient" className="text-center"> Subscription management</TextType>

      <Card variant="default" className="h-full">
        <CardBody>
          {/* Icône */}
          <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4 text-orange-600">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          <TextType variant="h3">Rendu Ultra-Rapide</TextType>
          <TextType variant="body" className="mt-2">
            Utilisez notre cluster GPU pour générer vos vidéos en quelques
            secondes, pas en heures.
          </TextType>
        </CardBody>
      </Card>

      <TextType variant="gradient" className="text-center">
        Simple and transparent nomapp pricing
      </TextType>

      <Card variant="default" className="h-full">
        <CardBody>
          {/* Icône */}
          <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4 text-orange-600">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          <TextType variant="h3">Rendu Ultra-Rapide</TextType>
          <TextType variant="body" className="mt-2">
            Utilisez notre cluster GPU pour générer vos vidéos en quelques
            secondes, pas en heures.
          </TextType>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tokens;
