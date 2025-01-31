import { useApp } from "./../../contexts/AppContext";
import styles from "./Table.module.css";

const URL = import.meta.env.VITE_BASE_URL;
const columns = [
  "Timestamp",
  "Original Link",
  "Short Link",
  "ip address",
  "User Device",
];

function Table({ className, analytics }) {
  const { formatDate } = useApp();

  return (
    <article className={className}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {analytics.map((log, index) => (
            <tr key={index}>
              <td>{formatDate(log.accessedAt)}</td>
              <td>{log.originalUrl}</td>
              <td>{`${URL}/${log.shortCode}`}</td>
              <td>{log.ipaddress}</td>
              <td className={styles.device}>{log.userAgent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export default Table;
