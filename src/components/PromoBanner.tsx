// src/components/PromoBanner.tsx
import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import { AnimatePresence, motion } from "framer-motion";
import { useCountdown } from "./hooks/useCountdown";
import { PROMO_CONFIG } from "../config/promo";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function PromoBanner() {
  const { t } = useI18n();
  const { days, hours, minutes, seconds, isFinished } = useCountdown(
    PROMO_CONFIG.endDate
  );
  const [isClose, setIsClose] = useState<Boolean>(false);

  // Conditions d'affichage :
  // 1. La config doit être active
  // 2. Le timer ne doit pas être terminé
  const shouldShow = PROMO_CONFIG.isActive && !isFinished;

  if (!shouldShow || isClose) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`relative z-[60] text-white shadow-md ${PROMO_CONFIG.backgroundColor}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-sm sm:px-6 lg:px-8">
          {/* Version Mobile : Stacked */}
          <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
            {/* Texte de l'offre */}
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-xs uppercase tracking-wider">
                {PROMO_CONFIG.code
                  ? `${t("promo.code")}: ${PROMO_CONFIG.code}`
                  : "PROMO"}
              </span>
              <span className="font-medium">
                {t("promo.text", { percent: PROMO_CONFIG.discountPercent })}
              </span>
            </div>

            {/* Timer & CTA */}
            <div className="flex items-center gap-4">
              {/* Timer Display */}
              <div className="flex items-center gap-1 font-mono text-xs font-semibold tabular-nums opacity-90">
                <div className="flex flex-col items-center">
                  <span>{days}j</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center">
                  <span>{hours.toString().padStart(2, "0")}h</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center">
                  <span>{minutes.toString().padStart(2, "0")}m</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center">
                  <span className="text-yellow-300">
                    {seconds.toString().padStart(2, "0")}s
                  </span>
                </div>
              </div>

              {/* Button */}
              <Link
                to={PROMO_CONFIG.linkTo}
                className="group relative overflow-hidden rounded-full bg-white px-4 py-1 text-xs font-bold text-indigo-600 transition-transform hover:scale-105 active:scale-95"
              >
                {t("promo.button")}
              </Link>

              {/* CLOSED BUTTON */}
              <button>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => setIsClose(true)}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
