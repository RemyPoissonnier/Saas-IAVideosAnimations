import Card, { CardBody } from "./Card";
import TextType from "./TextType";
import { useI18n } from "../../i18n";
import { useSubscription } from "../hooks/useSubcription";

// Type de la réponse attendue (DTO)
export type SubscriptionData = {
  isActive: boolean;
  tier?: string;
  planName?: string;
  renewalDate?: string;
  cancelAtPeriodEnd?: boolean;
};

export const SubscriptionInfo = () => {
  const { t } = useI18n(); // 👈 Initialisation du hook de traduction
  const { subscription } = useSubscription();

  return (
    <>
      <TextType variant="gradient" className="text-center text-4xl">
        {t("subscription.title")} {/* "Subscription management" */}
      </TextType>

      <Card variant="outline" className="h-full">
        <CardBody>
          <TextType variant="h2" className="mb-2">
            {t("subscription.mySub")} {/* "Mon Abonnement" */}
          </TextType>

          {subscription?.isActive ? (
            <div>
              <TextType variant="body">
                {t("subscription.tier")} {/* "Niveau :" */}
                <span className="font-bold capitalize">
                  {subscription.tier}
                </span>
              </TextType>

              <TextType variant="body">
                {t("subscription.name")} {subscription.planName} {/* "Nom :" */}
              </TextType>

              <TextType variant="body">
                {t("subscription.endDate")} {/* "Fin de période :" */}
                {subscription.renewalDate
                  ? new Date(subscription.renewalDate).toLocaleDateString()
                  : t("common.na")}{" "}
                {/* "N/A" */}
              </TextType>

              <TextType variant="body">
                {t("subscription.cancel")} {/* "Annulation prévue :" */}
                {subscription.cancelAtPeriodEnd
                  ? t("subscription.yes")
                  : t("subscription.no")}
              </TextType>
            </div>
          ) : (
            <TextType variant="body">
              {t("subscription.empty")} {/* "Not subscribed" */}
            </TextType>
          )}
        </CardBody>
      </Card>
    </>
  );
};
