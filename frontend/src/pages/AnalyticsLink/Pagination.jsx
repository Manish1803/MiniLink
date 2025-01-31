import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import styles from "./Pagination.module.css";

function Pagination({ className, currentPage, totalPages = 10, onPageChange }) {
  const getPageNumber = () => {
    if (currentPage >= 8) {
      return [1, 2, "...", currentPage - 1, currentPage];
    } else if (currentPage <= 2) {
      return [1, 2, "...", 9, 10];
    } else {
      return [1, 2, "...", currentPage, "...", 9, 10];
    }
  };

  return (
    <div className={className}>
      <div className={styles.container}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.arrow}
          aria-label="Previous Page"
        >
          <MdKeyboardArrowLeft size="2rem" />
        </button>
        {getPageNumber().map((page) => {
          const isDisabled = page > totalPages;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${styles.page} ${
                page === currentPage ? styles.active : ""
              }`}
              disabled={page === "..." || isDisabled}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.arrow}
        >
          <MdKeyboardArrowRight size="2rem" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
