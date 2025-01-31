import { IoSearch } from "react-icons/io5";
import { useApp } from "./../../../../contexts/AppContext";
import { useNavigate } from "react-router";

const styles = {
  search: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    border: "1px solid var(--color-border)",
    borderRadius: "0.5rem",
    padding: "1rem",
    color: "#b1b3c8",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginRight: "3rem",
  },
  searchInput: {
    border: "none",
    outline: "none",
    fontSize: "1.4rem",
  },
};

function Search() {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useApp();

  const handleFocus = () => {
    navigate("/app/links");
  };

  return (
    <div style={styles.search}>
      <IoSearch size="2rem" />
      <input
        type="text"
        placeholder="Search by remarks"
        style={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleFocus}
      />
    </div>
  );
}

export default Search;
