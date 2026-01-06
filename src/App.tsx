import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Tokens from "./pages/Tokens";
import Success from "./pages/Success";
import Prompt from "./pages/Prompt";
import PromoBanner from "./components/PromoBanner";
import { Footer } from "./components/Footer";
import { AuroraStrip } from "./components/ui/AuroraStrip";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === "/login";

  const handleOpenAuth = () => navigate("/login");
  const handleBackHome = () => navigate("/home");

  return (
    <>
      {/* --- ZONE 1 : NAVIGATION FIXE (Au-dessus de tout) --- */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center gap-4 pointer-events-none">
        {/* Banner : Cliquable */}
        <div className="w-full pointer-events-auto">
          <PromoBanner />
        </div>

        {/* Header : Cliquable */}
        {!isAuthPage && (
          <div className="pointer-events-auto">
            <Header
              onOpenAuth={handleOpenAuth}
              isAuthPage={isAuthPage}
              onBackHome={
                location.pathname !== "/home" && location.pathname !== "/"
                  ? handleBackHome
                  : undefined
              }
              tokensHref="/tokens"
            />
          </div>
        )}
      </div>
      {/* ▲▲▲ IMPORTANT : On ferme la div FIXE ici, AVANT le main ▲▲▲ */}

      {/* --- ZONE 2 : CONTENU DU SITE (Flux normal, scrollable) --- */}
      <main className="flex pt-36 min-h-screen bg-background justify-center content-center pb-5">
        <div className="w-5/6">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Landing />} />
            <Route
              path="/login"
              element={<Login onBackHome={handleBackHome} />}
            />
            <Route path="/tokens" element={<Tokens />} />
            <Route
              path="/prompt"
              element={<Prompt onOpenAuth={handleOpenAuth} />}
            />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </main>
      <AuroraStrip />
      <Footer />
    </>
  );
}

export default App;
