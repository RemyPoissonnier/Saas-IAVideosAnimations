import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Utilisation de Link au lieu de <a> pour SPA
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../i18n";
import logoZoom from "../assets/logoZoom.png";
import { Option } from "./Option";
import Pill from "./ui/Pill";
import DesktopHeader from "./ui/header/DesktopHeader";
import MobileHeader from "./ui/header/MobileHeader";

// --- Sub-components for Clean Architecture ---

// --- Types ---

type HeaderProps = {
  onOpenAuth: () => void;
  onBackHome?: () => void;
  isAuthPage?: boolean;
  tokensHref?: string;
};

// --- Main Component ---

export function Header({
  onOpenAuth,
  onBackHome,
  isAuthPage,
  tokensHref = "/tokens",
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Common Nav Items logic could be extracted here if list grows

  return (
    <>
      {/* --- DESKTOP HEADER (Pill) --- */}
      <DesktopHeader
        onOpenAuth={onOpenAuth}
        onBackHome={onBackHome}
        isAuthPage={isAuthPage}
        tokensHref={tokensHref}
      />

      {/* --- MOBILE TOGGLE (Visible only on mobile) --- */}
      <MobileHeader onOpenAuth={onOpenAuth} tokensHref={tokensHref} />
    </>
  );
}

export default Header;
