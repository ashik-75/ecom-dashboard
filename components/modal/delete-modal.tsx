import { Button } from "../ui/button";
import Modal from "../ui/modal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

function DeleteModal({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Are you sure?"
        description="This action cannot be undone"
      >
        <div className="flex gap-5 justify-end">
          <Button variant={"secondary"} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={loading}
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteModal;
