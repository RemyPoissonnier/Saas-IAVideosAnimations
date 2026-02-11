import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "../../../i18n";
import { useNavigate } from "react-router-dom"; // 1. Importer le hook

export const StickyScrollButton = () => {
  const { scrollYProgress } = useScroll();
  const { t } = useI18n();
  const navigate = useNavigate(); // 2. Initialiser la navigation

  const yPos = useTransform(scrollYProgress, [0, 0.1], ["50vh", "90vh"]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1.2, 1]);

  // 3. Fonction de redirection
  const handleClick = () => {
    navigate("/prompt");
  };

  return (
    <motion.button
      onClick={handleClick} // 4. Ajouter l'événement au clic
      style={{
        position: "fixed",
        top: yPos,
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
        scale: scale,
        zIndex: 50,
      }}
      // Fusion des classes Tailwind de ton ancien bouton interne ici
      className="flex items-center gap-3 px-6 py-3 bg-zinc-900 text-white 
      rounded-full border border-white/10 shadow-lg hover:bg-zinc-800 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Le point rouge clignotant */}
      <motion.span
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-3 h-3 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)]"
      />
      
      <span className="font-medium uppercase tracking-wider text-sm">
        {t('start')}
      </span>
    </motion.button>
  );
};