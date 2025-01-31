import { useApp } from "./../contexts/AppContext";
import LinksTable from "./AnalyticsLink/LinksTable";
import Pagination from "./AnalyticsLink/Pagination";
import Section from "./AnalyticsLink/Section";

import styles from "./AnalyticsLink/Common.module.css";

function Links() {
  const { links, pagination, handlePageChange } = useApp();

  if (links.length === 0)
    return (
      <Section>
        <p className={styles.noData}>
          No links recorded yet. Start engaging to see data here! Click on
          &quot;Create New&quot; to get started!
        </p>
      </Section>
    );

  return (
    <Section>
      <LinksTable className={styles.tableContainer} links={links} />
      <Pagination
        className={styles.pagination}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </Section>
  );
}

export default Links;
