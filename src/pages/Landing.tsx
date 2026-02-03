import { ScrollSection } from "../components/ui/ScrollSection";
import SplitText from "../components/ui/SplitText";
import { useI18n } from "../i18n";
import { themeText } from "../theme/text";
import { BlurEffect } from "../components/ui/animation/BlurEffect";
import { CheapPaperAnimation } from "../components/ui/animation/CheapPaperAnimation";
import { StickyScrollButton } from "../components/ui/animation/StickyScrollButton";

export function Landing() {
  const { t } = useI18n();
  const brandBase = `${themeText.color.secondary} text-[64px] md:text-[96px] font-bold ${themeText.typo.secondary} leading-none`;
  const cameraPath = "/images/whisker/Camera.png";
  const clapperBoardPath = "/images/whisker/Clapperboard.png";
  const concentratedCatPath = "/images/whisker/ConcentratedCat.png";
  const filmingCatPath = "/images/whisker/FilmingCat.png";

  return (
    <>
      <StickyScrollButton />
      <div className="space-y-10 px-4 md:px-6">
        <section className="text-center space-y-4">
          <SplitText
            tag="h1"
            text={t("landing.title")}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6 font-[Roboto]"
          />
        </section>
        <div className="flex flex-col md:flex-row w-full min-h-[400px] gap-8">
          {/* Left Side: Brand Identity */}
          <BlurEffect>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start">
              <h1 className={brandBase}>Whisker</h1>
              {/* Shift the second word using margins instead of absolute positioning */}
              <h1 className={`${brandBase} ml-12 md:ml-24 -mt-7`}>Studio</h1>
            </div>
          </BlurEffect>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <CheapPaperAnimation srcImage={clapperBoardPath} />
          </div>
          {/* Right Side: Content */}
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Section 1: Text Left, Image Right */}
          <ScrollSection
            title="Modern Aesthetics"
            description="Experience a interface designed with precision and clarity. Every pixel serves a purpose."
            imageSrc={concentratedCatPath}
          />

          {/* Section 2: Text Right, Image Left */}
          <ScrollSection
            title="Fluid Motion"
            description="Smooth transitions and reactive elements that respond to your every scroll."
            imageSrc={filmingCatPath}
            reverse={true}
          />

          {/* Section 3: Text Left, Image Right */}
          <ScrollSection
            title="Built for Speed"
            description="Optimized performance that ensures your brand stays ahead of the curve."
            imageSrc={cameraPath}
          />
        </div>
      </div>
    </>
  );
}

export default Landing;
