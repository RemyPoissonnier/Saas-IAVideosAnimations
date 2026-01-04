import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  className,
}: ModalProps) => {
  // Empêcher le scroll du body quand la modale est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Gérer la fermeture avec la touche Echap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Gestion des tailles
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[95vw]",
  };

  // Le contenu du modal
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP FLOU */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px] transition-all"
            aria-hidden="true"
          />

          {/* CONTENEUR CENTRÉ */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            
            {/* LA BOITE MODALE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} // Courbe "snappy"
              className={clsx(
                "pointer-events-auto relative w-full flex flex-col max-h-[90vh]",
                "bg-surface border border-border/60 shadow-2xl shadow-black/20 rounded-2xl",
                "text-text overflow-hidden",
                sizeClasses[size],
                className
              )}
              role="dialog"
              aria-modal="true"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 shrink-0">
                <h2 className="text-lg font-semibold tracking-tight">
                  {title || "Information"}
                </h2>
                <button
                  onClick={onClose}
                  className="grid h-8 w-8 place-items-center rounded-full text-muted hover:text-text hover:bg-surface-strong/50 transition-colors"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* BODY (SCROLLABLE) */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                {children}
              </div>

              {/* FOOTER (OPTIONNEL) */}
              {footer && (
                <div className="px-6 py-4 bg-surface-2/30 border-t border-border/40 shrink-0 gap-3">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  // Utilisation de Portal pour injecter la modale à la racine du body
  if (typeof document === "undefined") return null;
  return createPortal(modalContent, document.body);
};