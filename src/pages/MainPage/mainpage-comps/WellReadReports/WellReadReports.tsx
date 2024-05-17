import React from "react";
import InfiniteReport from "../InfiniteReport/InfiniteReport";
import styles from "./WellReadReports.module.css";

function WellReadReports() {
  return (
    <div className={styles["comp"]}>
      <div className={styles["text1"]}>최신 독후감</div>
      <InfiniteReport />
    </div>
  );
}

export default WellReadReports;
