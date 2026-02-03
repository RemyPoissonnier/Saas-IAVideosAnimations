import { BlurEffect } from "./animation/BlurEffect";
import { CheapPaperAnimation } from "./animation/CheapPaperAnimation";

type scrollSectionProp = {
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
};

// Reusable Section Component
export const ScrollSection = ({
  title,
  description,
  imageSrc,
  reverse = false,
}: scrollSectionProp) => {
  return (
    <section className="h-screen w-full snap-start snap-always flex items-center justify-center px-6 md:px-20 overflow-hidden">
      <div
        className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between w-full max-w-7xl gap-12`}
      >
        {/* Animated Text Block */}
        <BlurEffect>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-md">
            {description}
          </p>
        </BlurEffect>

        {/* Animated Image Block */}
        <BlurEffect reverse={true}>
          <CheapPaperAnimation srcImage={imageSrc} />
        </BlurEffect>
      </div>
    </section>
  );
};
