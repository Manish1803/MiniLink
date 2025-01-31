import styles from "./DeleteModal.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function DeleteModal({
  itemId,
  itemType = "Link",
  onClose,
  onDelete,
  message,
  set,
}) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (itemType === "Link") {
      try {
        await onDelete(itemId);
        toast.success(`${itemType} Deleted!`);
        onClose();
      } catch (error) {
        toast.error(error.message || "Please try again later");
      } finally {
        set();
        onClose();
      }
    }

    if (itemType === "Account") {
      try {
        await onDelete();
        toast.success(`${itemType} Deleted!`);
        onClose();
        navigate("/");
      } catch (error) {
        toast.error(error.message || "Please try again later");
      } finally {
        set();
        onClose();
      }
    }
  };

  return (
    <div className={styles.modal}>
      <button className={styles.btnClose} onClick={onClose}>
        &times;
      </button>
      <p className={styles.title}>
        {" "}
        Are you sure, you want to {message || `remove it?`}
      </p>
      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={onClose}>
          No
        </button>
        <button
          className={`${styles.btn} ${styles.confirm}`}
          onClick={handleDelete}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
