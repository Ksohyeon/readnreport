import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MyReportPage.module.css";
import { ImBookmark } from "react-icons/im";
import { call } from "../../service/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { closeSideBar } from "../../features/sideBar/sideBarSlice";

function MyReportPage() {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState();
  const sideBar = useSelector((state) => state.sideBar.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sideBar === true) dispatch(closeSideBar());
  }, []);

  useEffect(() => {
    call("/report", "GET", null).then((response) => {
      setReports(response?.data);
      setLoading(false);
      console.log("reports: ", response);
    });
  }, []);

  if (loading) {
    return (
      <>
        <h1>로딩중..</h1>
      </>
    );
  }

  return (
    <div>
      <div className={styles["bs"]}>
        <div className={styles["div1"]}>
          <div className={styles["menu-name"]}>
            <Link className={styles["report-btn"]} to="/write">
              독후감 작성
            </Link>
          </div>

          <div className={styles["book-shelf"]}>
            {reports &&
              reports.map((report) => {
                const color =
                  "#" + parseInt(Math.random() * 0xffffff).toString(16);
                return (
                  <div
                    key={report.id}
                    className={styles["book"]}
                    style={{ backgroundColor: color }}
                  >
                    {report.bookTitle}
                  </div>
                );
              })}
            <ImBookmark className={styles["bookmark"]} size={80} />
          </div>
        </div>
      </div>
      <div className={styles["div2"]}>
        <div className={styles["reports"]}>
          {reports &&
            reports.map((report) => {
              const color =
                "#" + parseInt(Math.random() * 0xffffff).toString(16);
              return (
                <Link
                  key={report.id}
                  className={styles["link"]}
                  to={{
                    pathname: "/detail",
                    search: `?id=${report.id}`,
                  }}
                >
                  <div
                    key={report.id}
                    className={styles["report"]}
                    style={{ backgroundColor: color }}
                  >
                    {report.title}
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MyReportPage;
