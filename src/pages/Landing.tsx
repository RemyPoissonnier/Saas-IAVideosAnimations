import { ScrollSection } from "../components/ui/ScrollSection";
import SplitText from "../components/ui/SplitText";
import { useI18n } from "../i18n";
import { themeText } from "../theme/text";
import { BlurEffect } from "../components/ui/animation/BlurEffect";
import { StickyScrollButton } from "../components/ui/animation/StickyScrollButton";
import TextType from "../components/ui/TextType";
import { CatChanging } from "../components/ui/animation/CatChanging";
import SEO from "../components/SEO";

export function Landing() {
  const { t } = useI18n();
  // const clapperBoardPath = "/images/whisker/Clapperboard.png";
  const brandBase = `${themeText.color.secondary} text-[64px] md:text-[96px] font-bold ${themeText.typo.secondary} leading-none`;
  const cameraPath = "/images/whisker/Camera.png";
  const concentratedCatPath = "/images/whisker/ConcentratedCat.png";
  const filmingCatPath = "/images/whisker/FilmingCat.png";

  return (
    <>
      <SEO 
        title={t("landing.title")} 
        description={t("landing.description")} 
        url="https://whisker.studio/"
      />
      <StickyScrollButton />
      <div className="space-y-10 px-4 md:px-6">
        <section className="text-center space-y-4">
          <SplitText
            tag="h1"
            text={t("landing.title")}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6 font-[Roboto]"
          />
        </section>
        <div className="flex flex-col md:flex-row w-full h-full min-h-[400px] gap-8">
          {/* Left Side: Brand Identity */}
          <BlurEffect>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start">
              <h1 className={brandBase}>Whisker</h1>
              {/* Shift the second word using margins instead of absolute positioning */}
              <h1 className={`${brandBase} ml-12 md:ml-24 -mt-7`}>Studio</h1>
              <TextType
                variant="custom"
                className="w-full pl-6 text-[14px] md:text-[23px] text-pretty text-justify text-bold"
              >
                {t("landing.description")}
              </TextType>
            </div>
          </BlurEffect>
          <BlurEffect>
            <div className="w-full md:w-1/2 justify-end items-end">
              <CatChanging />
            </div>
          </BlurEffect>

          {/* Right Side: Content */}
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Section 1: Text Left, Image Right */}
          <ScrollSection
            title={t("landing.section1.title")}
            description={t("landing.section1.text")}
            imageSrc={concentratedCatPath}
          />

          {/* Section 2: Text Right, Image Left */}
          <ScrollSection
            title={t("landing.section2.title")}
            description={t("landing.section2.text")}
            imageSrc={filmingCatPath}
            reverse={true}
          />

          {/* Section 3: Text Left, Image Right */}
          <ScrollSection
            title={t("landing.section3.title")}
            description={t("landing.section3.text")}
            imageSrc={cameraPath}
          />
        </div>
      </div>
    </>
  );
}

export default Landing;
