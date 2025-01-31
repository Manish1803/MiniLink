import styles from "./Section.module.css";

function Section({ children }) {
  return <section className={styles.section}>{children}</section>;
}

export default Section;
