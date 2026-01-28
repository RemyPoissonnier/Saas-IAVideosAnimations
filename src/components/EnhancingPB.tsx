import { useEnhance } from "./hooks/useEnchance";
import { Sparkles, Loader2 } from "lucide-react";
import Button from "./ui/Button";
import { Modal } from "./ui/Modal";
import { useState } from "react";
import { useI18n } from "../i18n";

type PropEnhancingPB = {
  prompt: string;
  setPrompt: (value: string) => void;
};

export const EnhancingPB = ({ prompt, setPrompt }: PropEnhancingPB) => {
  const { enhancePrompt, isEnhancing } = useEnhance();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const { t } = useI18n();

  const handleMagicEnhance = async () => {
    const upgraded = await enhancePrompt(prompt);
    if (upgraded) {
        setPrompt(upgraded)};
        setIsLogoutModalOpen(false)
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsLogoutModalOpen(true)}
        disabled={isEnhancing || !prompt}
        className=" p-2 text-orange-500 hover:scale-110 disabled:opacity-30 transition-all"
      >
        {isEnhancing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Sparkles className="w-5 h-5 fill-orange-100" />
        )}
      </button>

      {/* === MODAL ==== */}

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title={t("prompt.enhance.modal.title")}
        size="sm"
        footer={
          <div className="flex justify-between content-center">
            <Button
              variant="primary"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              {t("prompt.enhance.modal.cancel")}
            </Button>
            <Button variant="secondary" onClick={handleMagicEnhance}>
              {t("prompt.enhance.modal.confirm")}
            </Button>
          </div>
        }
      >
        <p className="text-muted text-sm leading-relaxed">
          {t("prompt.enhance.modal.description")}
        </p>
      </Modal>
    </>
  );
};
