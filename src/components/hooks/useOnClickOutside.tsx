// src/hooks/useOnClickOutside.ts
import { useEffect, type RefObject } from "react";

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>, // La référence de la "boîte" à surveiller
  handler: (event: Event) => void // La fonction à lancer (ex: fermer le menu)
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref.current;
      // Si l'élément n'existe pas ou si le clic est DANS l'élément, on ne fait rien
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};