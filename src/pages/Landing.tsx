import { motion } from "framer-motion";
import { ScrollSection } from "../components/ui/ScrollSection";
import SplitText from "../components/ui/SplitText";
import TextType from "../components/ui/TextType";
import { useI18n } from "../i18n";
import { themeText } from "../theme/text";

export function Landing() {
  const { t } = useI18n();
  const brandBase = `${themeText.color.secondary} text-[64px] md:text-[96px] font-bold ${themeText.typo.secondary} leading-none`;

  return (
    <>
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
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start">
              <motion.div
                initial={{ opacity: 0, filter: "blur(20px)", x: -50 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                viewport={{ margin: "-10% 0px -10% 0px" }} // Triggers when mostly in view
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="flex flex-col"
              >
                <h1 className={brandBase}>Whisker</h1>
                {/* Shift the second word using margins instead of absolute positioning */}
                <h1 className={`${brandBase} ml-12 md:ml-24 -mt-7`}>Studio</h1>
              </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)", x: 50 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            viewport={{ margin: "-10% 0px -10% 0px" }} // Triggers when mostly in view
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full md:w-1/2 rounded-xl bg-violet-500 flex items-center justify-center text-white"
          >
            {/* Right Side: Content */}
            TEST CONTENT
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Section 1: Text Left, Image Right */}
          <ScrollSection
            title="Modern Aesthetics"
            description="Experience a interface designed with precision and clarity. Every pixel serves a purpose."
            imageColor="bg-violet-500"
          />

          {/* Section 2: Text Right, Image Left */}
          <ScrollSection
            title="Fluid Motion"
            description="Smooth transitions and reactive elements that respond to your every scroll."
            imageColor="bg-blue-500"
            reverse={true}
          />

          {/* Section 3: Text Left, Image Right */}
          <ScrollSection
            title="Built for Speed"
            description="Optimized performance that ensures your brand stays ahead of the curve."
            imageColor="bg-emerald-500"
          />
        </div>
      </div>
    </>
  );
}

export default Landing;
