import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useApp } from "./../../../../contexts/AppContext";

import Overlay from "./../../../AppComponents/Overlay";
import LinkModal from "../../../AppComponents/LinkModal";

function Button() {
  const { createNewLink } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "1rem 1.5rem",
          borderRadius: "0.5rem",
          backgroundColor: "var(--color-primary)",
          color: "#fff",
          fontWeight: "500",
        }}
        onClick={() => setIsOpen((is) => !is)}
      >
        <GoPlus size="2rem" /> <span>Create new</span>
      </button>
      {isOpen && (
        <Overlay>
          <LinkModal
            onClose={() => setIsOpen(false)}
            onSubmit={createNewLink}
            action="create"
          />
        </Overlay>
      )}
    </>
  );
}

export default Button;
