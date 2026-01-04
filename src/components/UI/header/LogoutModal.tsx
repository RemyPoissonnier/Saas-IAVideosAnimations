import Button from "../Button";
import { Modal } from "../Modal";
import { useI18n } from "../../../i18n";

type propLogoutModal = {
  isLogoutModalOpen: boolean;
  setIsLogoutModalOpen: (b : boolean) => void;
  handleConfirmLogout: () => void;
};

export default function LogoutModal({
  isLogoutModalOpen,
  setIsLogoutModalOpen,
  handleConfirmLogout,
}: propLogoutModal) {
  const { t } = useI18n();

  return (
    <Modal
      isOpen={isLogoutModalOpen}
      onClose={() => setIsLogoutModalOpen(false)}
      title={t("auth.signout")}
      size="sm"
      footer={
        <div className="flex justify-between content-center">
          <Button variant="primary" onClick={() => setIsLogoutModalOpen(false)}>
            {t("nav.logout.cancel")}
          </Button>
          <Button variant="secondary" onClick={handleConfirmLogout}>
            {t("nav.logout.confirm")}
          </Button>
        </div>
      }
    >
      <p className="text-muted text-sm leading-relaxed">
        {t("nav.logout.description")}
      </p>
    </Modal>
  );
}
