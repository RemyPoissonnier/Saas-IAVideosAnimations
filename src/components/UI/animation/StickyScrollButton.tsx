import { motion, useScroll, useTransform } from "framer-motion";

export const StickyScrollButton = () => {
  const { scrollYProgress } = useScroll();

  // We map the scroll from 0 (top) to 0.1 (just started scrolling)
  // This moves the Y position from 50vh (middle) to 90vh (bottom)
  const yPos = useTransform(scrollYProgress, [0, 0.1], ["50vh", "90vh"]);
  
  // Optional: Make it smaller or change opacity as it moves
  const scale = useTransform(scrollYProgress, [0, 0.1], [1.2, 1]);

  return (
    <motion.button
      style={{
        position: "fixed",
        top: yPos,
        left: "50%",
        x: "-50%", // Centers the button horizontally
        y: "-50%", // Centers the button vertically at start
        scale: scale,
        zIndex: 50,
      }}
      className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg shadow-xl border-2 border-black"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      COMMENCER
    </motion.button>
  );
};