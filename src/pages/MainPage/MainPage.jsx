import styles from "./MainPage.module.css";
import WellReadBooks from "./mainpage-comps/WellReadBooks/WellReadBooks";
import WellReadReports from "./mainpage-comps/WellReadReports";
import SearchBook from "./mainpage-comps/SearchBook/SearchBook";
import InfiniteReport from "./mainpage-comps/InfiniteReport/InfiniteReport";

function MainPage() {
  return (
    <>
      <div className={styles["main"]}>
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
      <InfiniteReport />
    </>
  );
}

export default MainPage;
