import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { fetchAnalytics } from "./../services/appService";

import Section from "./AnalyticsLink/Section";
import Table from "./AnalyticsLink/Table";
import Pagination from "./AnalyticsLink/Pagination";

import styles from "./AnalyticsLink/Common.module.css";

function Analytics() {
  const [analytics, setAnalytics] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const limit = 10;

  const fetchData = async (page) => {
    try {
      const response = await fetchAnalytics(page, limit);
      setAnalytics(response.logs);
      setPagination(response.pagination);
    } catch (error) {
      toast.error(error.message || "Please try again later");
    }
  };

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
      }));
    }
  };

  if (analytics.length === 0)
    return (
      <Section>
        <p className={styles.noData}>
          No activity recorded yet. Start engaging to see data here!
        </p>
      </Section>
    );

  return (
    <Section>
      <Table analytics={analytics} className={styles.tableContainer} />
      <Pagination
        className={styles.pagination}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </Section>
  );
}

export default Analytics;
