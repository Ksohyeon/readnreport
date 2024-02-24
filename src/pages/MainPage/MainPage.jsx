import styles from "./MainPage.module.css";
import WellReadBooks from "./mainpage-comps/WellReadBooks/WellReadBooks";
import WellReadReports from "./mainpage-comps/WellReadReports/WellReadReports";
import SearchBook from "../../components/SearchBook/SearchBook";
import CanvasComp from "./mainpage-comps/CamvasComp/CanvasComp";
import { useEffect } from "react";

function MainPage() {
  return (
    <>
      <div className={styles["main"]}>
        <div className={styles["canvas"]}>
          <CanvasComp />
        </div>
        <div className={styles["search-bar"]}>
          <SearchBook />
        </div>
        <div className={styles["element1"]}>
          <WellReadBooks />
        </div>
        <div className={styles["element"]}>
          <WellReadReports className={styles["element"]} />
        </div>
      </div>
    </>
  );
}

export default MainPage;
