import Card, { CardBody } from "../components/UI/Card";
import TextType from "../components/UI/TextType";
import { useI18n } from "../i18n";
import { BuyingCard } from "../components/UI/BuyingCard";
import { arrCoint, arrProdTest, arrSubs } from "../components/hooks/products";
import { useAuth } from "../context/AuthContext";

export function Tokens() {
  const { t } = useI18n(); // TODO I18N
  const { currentUser } = useAuth(); // On récupère l'utilisateur connecté

  const handleBuy = async (productId: string) => {
    if (!currentUser) {
      alert("Connectez-vous d'abord !");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: productId, // L'ID du produit Polar
          userId: currentUser.uid      // L'ID Firebase
        })
      });

      const data = await response.json();
      
      if (data.url) {
        // On redirige l'utilisateur vers Polar
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

  return (
    <div className="space-y-8 px-4 md:px-6 justify-center">
      <TextType variant="gradient" className="text-center">
        Subscription management
      </TextType>

      <Card variant="outline" className="h-full">
        <CardBody>
          <TextType variant="body" className="mt-2">
            Information sur l'abonnement
          </TextType>
        </CardBody>
      </Card>

      <TextType variant="gradient" className="text-center">
        Simple and transparent nomapp pricing
      </TextType>

      <div className="grid grid-cols-3 gap-4 hidden"> //TODO to remove hidden
        <div className="flex flex-col gap-2">
          {arrCoint.map((t, index) => (
            <BuyingCard key={index} {...t} ></BuyingCard>
          ))}
        </div>

        {arrSubs.map((t) => (
          <BuyingCard {...t}></BuyingCard>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {arrProdTest.map((t, index) => (
          <BuyingCard {...t} key={index} onClick={()=>handleBuy(t.polarId)}></BuyingCard>
        ))}
      </div>
    </div>
  );
}

export default Tokens;
