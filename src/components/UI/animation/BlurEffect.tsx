import { motion } from "framer-motion";

type BlurEffectProp = { //TODO to change
  title: string;
  description: string;
  imageColor: string;
  reverse?: boolean;
};

// Reusable Section Component
export const BlurEffect = ({
  title,
  description,
  imageColor,
  reverse = false,
}: BlurEffectProp) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(20px)", x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
      viewport={{ margin: "-10% 0px -10% 0px" }} // Triggers when mostly in view
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full md:w-1/2 space-y-6 z-10"
    ></motion.div>
  );
};
