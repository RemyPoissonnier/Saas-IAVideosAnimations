import { motion } from "framer-motion";
import ImageCycle from "./ImageCycle";

export const CatChanging = () => {
  const blinkingCatPath = "/images/whisker/Cat_Head_Blinking.png";
  const openEyeCatPath = "/images/whisker/Cat_Head_Open_Eyes.png";
  const winkingCatPath = "/images/whisker/Winking_Cat_Head.png";
  const cycle = [blinkingCatPath, openEyeCatPath, winkingCatPath];

  return (
    <motion.div
      animate={{
        rotate: [-3, 3],
        x: [-2, 2],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 0.3,
        // Use lowercase "linear" or the steps function
        ease: "linear",
      }}
    >
      <ImageCycle images={cycle} />
    </motion.div>
  );
};

export default ImageCycle;
