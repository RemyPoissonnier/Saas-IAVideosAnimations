import Card, { CardBody, CardHeader } from "../components/ui/Card";
import TextType from "../components/ui/TextType";
import { useI18n } from "../i18n";

export default function About() {
  const { t } = useI18n();

  return (
    <div>
      {/* 1. HERO SECTION */}
      <div className="mb-12 text-center space-y-4">
        <TextType variant="gradient">{t("about.title")}</TextType>
        <TextType variant="body">{t("about.subtitle")}</TextType>
      </div>

      <div className="space-y-8 ">
        {/* 2. NOTRE MISSION (Grande Carte Mise en avant) */}
        <Card className="p-8 md:p-12 ">
          <CardHeader>
            <h2 className={` text-3xl !text-accent`}>
              {t("about.mission.title")}
            </h2>
          </CardHeader>
          <CardBody>
            <p className="text-lg md:text-xl text-text leading-relaxed font-medium opacity-90">
              {t("about.mission.text")}
            </p>
          </CardBody>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 3. NOTRE HISTOIRE */}
          <Card className="h-full flex flex-col justify-center">
            <CardHeader className={`p-2`}>
              <TextType variant="h3">
                <span className="text-2xl">🚀</span> {t("about.story.title")}
              </TextType>
            </CardHeader>

            <CardBody>
              <TextType variant="body">{t("about.story.text")}</TextType>
            </CardBody>
          </Card>

          {/* 4. NOS VALEURS */}
          <Card className="h-full">
            <CardHeader className="p-2">
              <TextType variant="h3">
                <span className="text-2xl">💎</span> {t("about.values.title")}
              </TextType>
            </CardHeader>
            <CardBody>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <span className={` text-base`}>
                    {t("about.values.innovation")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />
                  <span className={` text-base`}>
                    {t("about.values.transparency")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                  <span className={` text-base`}>{t("about.values.fun")}</span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
