import { useI18n } from "../i18n";
import { LegalSectionLayout } from "../components/legal/LegalSectionLayout";
import TextType from "../components/ui/TextType";

export default function Legal() {
  const { t } = useI18n();

  return (
    <div className="gap-2">
      <TextType variant="gradient" id="legalTitle">
        {t("legal.pageTitle")}
      </TextType>

      <TextType variant="body">{t("legal.pageSubtitle")}</TextType>

      <div className="grid gap-8">
        <LegalSectionLayout title={t("legal.mentions.title")} id="mentions">
          <p>
            <strong className="text-text font-semibold">Éditeur :</strong>{" "}
            {t("legal.mentions.editor")}
          </p>
          <p>
            <strong className="text-text font-semibold">Hébergement :</strong>{" "}
            {t("legal.mentions.host")}
          </p>
          <p>
            <strong className="text-text font-semibold">Contact :</strong>{" "}
            {t("legal.mentions.contact")}
          </p>
        </LegalSectionLayout>

        <LegalSectionLayout title={t("legal.cgu.title")} id="cgu">
          <p>{t("legal.cgu.intro")}</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-accent">
            <li>{t("legal.cgu.account")}</li>
            <li>{t("legal.cgu.use")}</li>
            <li>{t("legal.cgu.content")}</li>
          </ul>
        </LegalSectionLayout>

        <LegalSectionLayout title={t("legal.cgv.title")} id="cgv">
          <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg text-accent-strong mb-4">
            <strong className="font-bold">Important :</strong>{" "}
            {t("legal.cgv.retractationWarning")}
          </div>
          <p>{t("legal.cgv.price")}</p>
          <p>{t("legal.cgv.delivery")}</p>
          <p>{t("legal.cgv.refund")}</p>
        </LegalSectionLayout>

        <LegalSectionLayout
          title={t("legal.aiSection.title")}
          disclaimer={t("legal.aiSection.disclaimer")}
          id="privacy"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-text mb-1">
                {t("legal.aiSection.nature.title")}
              </h3>
              <p>{t("legal.aiSection.nature.text")}</p>
            </div>
            <div>
              <h3 className="font-semibold text-text mb-1">
                {t("legal.aiSection.data.title")}
              </h3>
              <p>{t("legal.aiSection.data.text")}</p>
            </div>
            <div>
              <h3 className="font-semibold text-text mb-1">
                {t("legal.aiSection.privacy.title")}
              </h3>
              <p>{t("legal.aiSection.privacy.text")}</p>
            </div>
            <div>
              <h3 className="font-semibold text-text mb-1">
                {t("legal.aiSection.responsibility.title")}
              </h3>
              <p>{t("legal.aiSection.responsibility.text")}</p>
            </div>
          </div>
        </LegalSectionLayout>

        {/* ... tes autres sections (Mentions, CGU, CGV, IA) ... */}

        {/* 5. POLITIQUE DE CONFIDENTIALITÉ (RGPD) */}
        <LegalSectionLayout
          title={t("legal.privacy.title")}
          id="privacy-policy"
          disclaimer={t("legal.privacy.intro")}
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Données Collectées */}
            <div className="bg-surface-strong/50 p-4 rounded-lg border border-border/50">
              <h3 className="font-semibold text-text mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                {t("legal.privacy.collected.title")}
              </h3>
              <p className="text-sm">{t("legal.privacy.collected.text")}</p>
            </div>

            {/* Sous-traitants */}
            <div className="bg-surface-strong/50 p-4 rounded-lg border border-border/50">
              <h3 className="font-semibold text-text mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                {t("legal.privacy.processors.title")}
              </h3>
              <p className="text-sm">{t("legal.privacy.processors.text")}</p>
            </div>

            {/* Vos Droits */}
            <div className="md:col-span-2">
              <h3 className="font-semibold text-text mb-1">
                {t("legal.privacy.rights.title")}
              </h3>
              <p>{t("legal.privacy.rights.text")}</p>
            </div>

            {/* Cookies */}
            <div className="md:col-span-2 pt-4 border-t border-border/40">
              <h3 className="font-semibold text-text mb-1">
                {t("legal.privacy.cookies.title")}
              </h3>
              <p className="text-sm italic opacity-80">
                {t("legal.privacy.cookies.text")}
              </p>
            </div>
          </div>
        </LegalSectionLayout>
      </div>
    </div>
  );
}
