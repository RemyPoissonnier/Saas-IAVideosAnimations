import Card, { CardBody } from "../components/UI/Card";
import TextType from "../components/UI/TextType";
import { useI18n } from "../i18n";
import coin from "../assets/coinFace.png";
import { BuyingCard } from "../components/UI/BuyingCard";

export function Tokens() {
  const { t } = useI18n();// TODO I18N

  const arrCoint = [
    {
      srcImage: coin,
      isActive: false,
      cost: 19.98,
      title: "Token",
      text: "100 tokens to generate many videos",
    },

    {
      srcImage: coin,
      isActive: false,
      cost: 199.98,
      title: "Token premium",
      text: "1200 tokens to generate many videos",
    },
  ];

   const arrSubs = [
    {
      srcImage: coin,
      isActive: true,
      cost: 39.98,
      title: "Pro Monthly",
      text: "300 tokens per month to generate many video 300 tokens per month \n" + "- Priority generation\n" + 
      "- Priority access to upcoming new features (automatic social media deployment)\n"
        + "- Photo-to-Video mode\n" + "- Priority support\n" + "- Watermark-free videos",
    },

    {
      srcImage: coin,
      isActive: false,
      cost: 399.98,
      title: "Pro Annual",
      text: "300 tokens per month + 2 free month, to generate many videos",
    },
  ];


  return (
    <div className="space-y-8 px-4 md:px-6 justify-center">
      <TextType variant="gradient" className="text-center">
        Subscription management
      </TextType>

      <Card variant="default" className="h-full">
        <CardBody>
          <img className="w-22 h-16" src={coin}></img>

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

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          {arrCoint.map(t => <BuyingCard 
          srcImage={t.srcImage}
            isActive={t.isActive}
            cost={t.cost}
            title={t.title}
            text={t.text}></BuyingCard>)}
        </div>

         {arrSubs.map(t => <BuyingCard 
          srcImage={t.srcImage}
            isActive={t.isActive}
            cost={t.cost}
            title={t.title}
            text={t.text}></BuyingCard>)}

      </div>
    </div>
  );
}

export default Tokens;
