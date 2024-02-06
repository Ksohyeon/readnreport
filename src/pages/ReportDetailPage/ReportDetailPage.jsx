import { Link, useSearchParams } from "react-router-dom";
import styles from "./ReportDetailPage.module.css";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { useEffect, useState } from "react";
import { call } from "../../service/ApiService";

function ReportDetailPage() {
  const [searchParams] = useSearchParams();
  const [reportItem, setReportItem] = useState();
  const id = searchParams.get("id");

  useEffect(() => {
    call(`/report/select?id=${id}`, "GET", null).then((response) => {
      setReportItem(response.data[0]);
      console.log("detail response: ", response);
    });
  }, [id]);

  useEffect(() => {
    console.log(reportItem);
  }, [reportItem]);

  const deleteReport = () => {
    call("/report", "DELETE", reportItem).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      {reportItem && (
        <div className={styles["report"]}>
          <div className={styles["div1"]}>
            <MdOutlineKeyboardDoubleArrowLeft
              className={styles["btn-back"]}
              size={40}
            />
            <Link
              to={{ pathname: "/bookshelf" }}
              className={styles["btn-back"]}
            >
              <button className={styles["btn-back"]}>목록</button>
            </Link>
          </div>
          <div className={styles["report-wapper"]}>
            <div className={styles["report-header"]}>
              <div className={styles["header-line"]}>
                <div className={styles["title"]}>{reportItem.title}</div>
                <div className={styles["created-time"]}>
                  {reportItem.createdAt.substr(0, 10)}
                </div>
              </div>
              <div className={styles["header-line"]}>
                <div className={styles["booktitle"]}>
                  {reportItem.bookTitle}
                </div>

                <div className={styles["view"]}>조회수 {reportItem.views}</div>
                <div className={styles["like"]}>
                  <span>
                    <IoIosHeart size={25} className={styles["heart"]} />
                  </span>
                  <span>&nbsp;{reportItem.likeCnt}</span>
                </div>
                <div className={styles["lock"]}>
                  {reportItem.publicOrPrivate ? (
                    <span>
                      {/* <FaLock /> */}
                      <FaUnlock />
                      &nbsp;공개
                    </span>
                  ) : (
                    "비공개"
                  )}
                </div>
              </div>
            </div>
            <div className={styles["report-content"]}>{reportItem.content}</div>
            <div className={styles["report-footer"]}>
              <Link
                className={styles["btn"]}
                to={"/write"}
                state={{ report: JSON.stringify(reportItem) }}
              >
                <button>수정</button>
              </Link>
              <Link className={styles["btn"]} to={"/bookshelf"}>
                <button onClick={deleteReport}>삭제</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReportDetailPage;
