function HeaderNav({ children }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--color-border)",
        padding: "1.5rem 2rem",
      }}
    >
      {children}
    </header>
  );
}

function NavContainer({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {children}
    </div>
  );
}

export { HeaderNav, NavContainer };
