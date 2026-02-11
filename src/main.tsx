import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import "./index.css";
import { I18nProvider } from "./i18n.tsx";
import { ThemeProvider } from "./theme.tsx";
import { BrowserRouter } from "react-router-dom"; // <--- Import essentiel
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // 👈 Import
import ScrollToTop from "./components/ScrollToTop.tsx";
import { HelmetProvider } from "react-helmet-async";

// On configure le client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 🧠 Les données restent "fraîches" 5 minutes (pas de refetch)
      retry: 1, // On ne réessaie qu'une fois en cas d'erreur
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <I18nProvider>
            <AuthProvider>
              <ScrollToTop />
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
