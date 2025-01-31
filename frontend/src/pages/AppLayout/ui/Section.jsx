function Section({ children }) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {children}
    </section>
  );
}

export default Section;
