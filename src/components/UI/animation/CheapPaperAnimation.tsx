import { motion } from "framer-motion";

type animationProp = {
    srcImage : string
}

export const CheapPaperAnimation = ({srcImage} : animationProp) => {
  return (
   <motion.div
  animate={{ 
    rotate: [-3, 3],
    x: [-2, 2] 
  }}
  transition={{
    repeat: Infinity,
    repeatType: "mirror",
    duration: 0.3,
    // Use lowercase "linear" or the steps function
    ease: "linear" 
  }}
>
  <img src={srcImage} alt="paper icon" />
</motion.div>
  );
};