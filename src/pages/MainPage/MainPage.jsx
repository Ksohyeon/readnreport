import styles from "./MainPage.module.css";
import WellReadBooks from "./mainpage-comps/WellReadBooks";
import Keywords from "./mainpage-comps/Keywords";
import WellReadReports from "./mainpage-comps/WellReadReports";
import SearchBook from "./mainpage-comps/SearchBook/SearchBook";

function MainPage() {
  return (
    <div className={styles["main"]}>
      <div className={styles["search-bar"]}>
        <SearchBook />
      </div>
      <div className={styles["element1"]}>
        <WellReadBooks />
      </div>
      <div className={styles["element"]}>
        <Keywords className={styles["element"]} />
      </div>
      <div className={styles["element"]}>
        <WellReadReports className={styles["element"]} />
      </div>
    </div>
  );
}

export default MainPage;
