import styles from "./ToggleButton.module.css";

function ToggleButton({ isChecked, toggleBtn }) {
  return (
    <div className={styles.button}>
      <label className={styles.switch}>
        <input type="checkbox" checked={isChecked} onChange={toggleBtn} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
}

export default ToggleButton;
