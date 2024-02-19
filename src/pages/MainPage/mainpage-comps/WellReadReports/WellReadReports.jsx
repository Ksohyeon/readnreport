import InfiniteReport from "../InfiniteReport/InfiniteReport";
import styles from "./WellReadReports.module.css";

function WellReadReports() {
  return (
    <div className={styles["wrr"]}>
      <div className={styles["text1"]}>인기 독후감</div>
      <InfiniteReport />
    </div>
  );
}

export default WellReadReports;
