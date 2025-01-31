import { useNavigate } from "react-router";
import { useAuth } from "./../../../../contexts/AuthContext";
import { useEffect, useState } from "react";
function UserProfile() {
  const navigate = useNavigate();
  const { user, fetchUser, getInitials, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: "4rem",
          height: "4rem",
          borderRadius: "50%",
          backgroundColor: "#fde48a",
          color: "#923e0e",
          fontWeight: "500",
        }}
        onClick={() => setIsOpen((is) => !is)}
      >
        {getInitials(user?.name)}
      </div>
      {isOpen && (
        <button
          style={{
            position: "absolute",
            bottom: "-5rem",
            left: "-5rem",
            color: "#878BA9",
            padding: "1rem 2rem",
            zIndex: 10,
            borderRadius: "0.5rem",
            backgroundColor: "#fff",
            fontWeight: "600",
            boxShadow: "var(--shadow)",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default UserProfile;
