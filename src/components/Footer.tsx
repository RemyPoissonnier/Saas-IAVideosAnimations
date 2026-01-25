import { Link } from "react-router-dom";
import TextType from "./ui/TextType";
import logo from "../assets/tlogo.png";
import { useI18n } from "../i18n";
import {
  faDiscord,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

// Définition de tes couleurs
const textBColor = "text-amber-900 dark:text-amber-100";
const textTColor = "text-black dark:text-orange-50";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer
      className={`w-full bg-amber-100 dark:bg-orange-950 pt-16 pb-8 ${textBColor}`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-4 justify-center">
          {/* COLONNE 1 : LOGO & DESCRIPTION */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <span className={`text-xl font-bold ${textTColor}`}>
                Animals IA
              </span>
            </Link>

            <TextType variant="body" className={`max-w-xs ${textBColor}`}>
              {t("footer.tagline")}
            </TextType>

            <div className="flex gap-4 mt-4">
              <SocialLink
                href="https://twitter.com"
                icon={<FontAwesomeIcon icon={faTwitter} />}
              />

              <SocialLink
                href="https://github.com/RemyPoissonnier"
                icon={<FontAwesomeIcon icon={faGithub} />}
              />
              <SocialLink
                href="https://discord.com"
                icon={<FontAwesomeIcon icon={faDiscord} />}
              />
            </div>
          </div>

          {/* COLONNE 2 : PRODUIT */}
          <div className="flex flex-col gap-4">
            <h4 className={`font-semibold ${textTColor}`}>
              {t("footer.product.title")}
            </h4>
            <nav className="flex flex-col gap-3">
              <FooterLink to="/create">
                {t("footer.product.generator")}
              </FooterLink>
              <FooterLink to="/tokens">
                {t("footer.product.pricing")}
              </FooterLink>
              <FooterLink to="/showcase">
                {t("footer.product.showcase")}
              </FooterLink>
              <FooterLink to="/changelog">
                {t("footer.product.changelog")}
              </FooterLink>
            </nav>
          </div>

          {/* COLONNE 3 : RESSOURCES */}
          <div className="flex flex-col gap-4">
            <h4 className={`font-semibold ${textTColor}`}>
              {t("footer.resources.title")}
            </h4>
            <nav className="flex flex-col gap-3">
              <FooterLink to="/docs">{t("footer.resources.docs")}</FooterLink>
              <FooterLink to="/api">{t("footer.resources.api")}</FooterLink>
              <FooterLink to="/community">
                {t("footer.resources.community")}
              </FooterLink>
              <FooterLink to="/help">
                {t("footer.resources.support")}
              </FooterLink>
            </nav>
          </div>

          {/* COLONNE 4 : ENTREPRISE / LÉGAL */}
          <div className="flex flex-col gap-4">
            <h4 className={`font-semibold ${textTColor}`}>
              {t("footer.legal.title")}
            </h4>
            <nav className="flex flex-col gap-3">
              <FooterLink to="/about">{t("footer.legal.about")}</FooterLink>
              <FooterLink to="/legal">{t("footer.legal.privacy")}</FooterLink>
              <FooterLink to="/legal">{t("footer.legal.terms")}</FooterLink>
              <button
                onClick={() =>
                  window.dispatchEvent(new Event("open-cookie-banner"))
                }
                className={`text-sm text-left transition-colors hover:text-amber-600 
                  hover:underline hover:underline-offset-4 ${textBColor}`}
              >
                {t("footer.manageCookies")}
              </button>
            </nav>
          </div>
        </div>

        {/* BAS DE PAGE */}
        <div
          className={`mt-16 flex flex-col items-center justify-between gap-4 border-t border-amber-200 pt-8 text-sm md:flex-row ${textBColor}`}
        >
          <p>
            <FontAwesomeIcon icon={faCopyright} /> {currentYear} Animals IA.{" "}
            {t("footer.rights")}
          </p>
          <div className="flex gap-8">
            <span>{t("footer.madeWith")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Petits composants internes ---

const FooterLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className={`text-sm transition-colors hover:text-amber-600 hover:underline hover:underline-offset-4 ${textBColor}`}
  >
    {children}
  </Link>
);

const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-200 text-orange-600 transition-colors hover:bg-amber-600 hover:text-white"
  >
    {icon}
  </a>
);
