import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApp } from "./../../contexts/AppContext";

import ToggleButton from "./ToggleButton";
import styles from "./LinkModal.module.css";

function LinkModal({ action = "create", linkData, onSubmit, onClose }) {
  const { refetch } = useApp();

  const [isChecked, setIsChecked] = useState(false);
  const [url, setUrl] = useState("");
  const [remarks, setRemarks] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (linkData) {
      setUrl(linkData.originalUrl);
      setRemarks(linkData.remarks);
      setExpiredDate(linkData.expiredAt);
    }
  }, [linkData]);

  const toggleBtn = () => {
    setIsChecked((is) => !is);
  };

  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  const validate = () => {
    const newErrors = {};

    if (!url) newErrors.url = "Destination Url is required";
    else if (!isValidURL(url)) newErrors.url = "Enter a valid url";

    if (!remarks) newErrors.remarks = "Remarks is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const data = {
        originalUrl: url,
        remarks,
        expiredAt: expiredDate || null,
      };

      let response;
      if (action === "update") {
        response = await onSubmit(linkData.id, data);
      } else {
        response = await onSubmit(data);
      }

      toast.success(response.message);
      refetch();
      onClose();
    } catch (error) {
      toast.error(error.message || "Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className={styles.modal}>
      <div className={styles.header}>
        <span>{action === "create" ? "Create Link" : "Edit Link"}</span>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="url">
            Destination Url<span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="url"
            id="url"
            placeholder="https://web.whatsapp.com/"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {errors.url && <span className={styles.error}>{errors.url}</span>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="remarks">
            Remarks<span className={styles.required}>*</span>
          </label>
          <textarea
            name="remarks"
            id="remarks"
            placeholder="Add remarks"
            rows="5"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
          {errors.remarks && (
            <span className={styles.error}>{errors.remarks}</span>
          )}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.box}>
            <span>Link Expiration</span>
            <ToggleButton
              isChecked={isChecked}
              toggleBtn={toggleBtn}
              label="Toggle"
            />
          </div>

          {isChecked && (
            <div className={styles.datePicker}>
              <input
                type="datetime-local"
                id="expiredDate"
                name="expiredDate"
                value={expiredDate}
                onChange={(e) => setExpiredDate(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <button className={styles.clear} onClick={onClose}>
            Clear
          </button>
          <button className={styles.create} disabled={isLoading}>
            {isLoading
              ? "Creating..."
              : action === "create"
              ? "Create new"
              : "Update"}
          </button>
        </div>
      </form>
    </article>
  );
}

export default LinkModal;
