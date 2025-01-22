import { useNavigate } from "react-router";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <h1>404 - Page Not Found!</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "1.2rem 2.5rem",
          fontSize: "1.4rem",
          color: "#fff",
          backgroundColor: "var(--color-primary)",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go to Home
      </button>
    </div>
  );
}

export default PageNotFound;
