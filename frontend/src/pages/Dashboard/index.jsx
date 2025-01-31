import { useEffect, useState } from "react";
import { fetchDashboardData } from "../../services/appService";
import styles from "./Dashboard.module.css";
import { toast } from "react-toastify";

function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchDashboardData();
        setData(response);
        console.log(response);
      } catch (error) {
        toast.error(error.message || "Please try again later");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.totalViews === 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.total}>
          Total Clicks <span className={styles.count}>0</span>
        </h2>
        <p className={styles.noData}>
          No activity recorded yet. Start engaging to see data here!
        </p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.total}>
        Total Clicks <span className={styles.count}>{data.totalViews}</span>
      </h2>
      <div className={styles.container}>
        <div className={styles.card}>
          <p className={styles.title}>Date-wise Clicks</p>
          <div className={styles.list}>
            {data.dateWise?.map((item, i) => (
              <div key={i} className={styles.item}>
                <span>{item.date}</span>
                <progress
                  max={data.totalViews}
                  value={item.count}
                  className={styles.progress}
                />
                <span>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.card}>
          <p className={styles.title}>Click Device</p>
          <div className={styles.list}>
            {data.deviceWise?.map((item) => (
              <div key={item.device} className={styles.item}>
                <span>{item.device}</span>
                <progress
                  value={item.count}
                  max={data.totalViews}
                  className={styles.progress}
                ></progress>
                <span>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
