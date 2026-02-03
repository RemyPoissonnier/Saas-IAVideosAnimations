import { motion } from "framer-motion";

type BlurEffectProp = {
  reverse?: boolean;
  children: React.ReactNode; // <--- Add this
};

// Reusable Section Component
export const BlurEffect = ({ children, reverse = false }: BlurEffectProp) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(20px)", x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
      viewport={{ margin: "-10% 0px -10% 0px" }} // Triggers when mostly in view
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full md:w-1/2"
    >
      {children}
    </motion.div>
  );
};
