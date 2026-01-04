import DesktopHeader from "./ui/header/DesktopHeader";
import MobileHeader from "./ui/header/MobileHeader";

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
