import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantané en haut à gauche à chaque changement d'URL
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}