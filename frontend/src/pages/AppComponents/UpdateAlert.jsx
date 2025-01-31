import { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";

function UpdateAlert() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="update">
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
          2/10 links available
        </p>
        <p
          style={{ cursor: "pointer", fontSize: "2rem" }}
          onClick={() => setIsVisible(false)}
        >
          &times;
        </p>
      </div>
      <p>
        Enjoying Shortener? Consider upgrading your plan so you can go
        limitless.
      </p>
      <div style={{ backgroundColor: "var(--color-primary)", height: "2px" }} />
      <p
        style={{
          color: "var(--color-primary)",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span>Upgrade now </span>
        <GoArrowRight size="2rem" />
      </p>
    </div>
  );
}

export default UpdateAlert;
