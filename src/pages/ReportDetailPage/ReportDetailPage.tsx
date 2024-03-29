import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./ReportDetailPage.module.css";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaRegEye, FaUnlock, FaLock } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { useEffect, useState } from "react";
import { call } from "../../service/ApiService";
import { useSelector } from "react-redux";
import { AuthState } from "components/SideBar/SideBar";

interface Report {
  id: string;
  title: string;
  bookTitle: string;
  content: string;
  views: number;
  likeCnt: number;
  createdAt: string;
  publicOrPrivate: boolean;
}

function ReportDetailPage() {
  const isLoggedIn = useSelector((state: AuthState) => state.auth.isLoggedIn);
  const [isMyReport, setIsMyReport] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [reportItem, setReportItem] = useState<Report>({
    bookTitle: "",
    content: "",
    createdAt: "",
    id: "",
    likeCnt: 0,
    publicOrPrivate: false,
    title: "",
    views: 0,
  });

  const handleLikeClick = () => {
    if (!(isLoggedIn && reportItem)) return;
    if (!like) {
      call("/report/like", "PUT", {
        ...reportItem,
        likeCnt: reportItem.likeCnt + 1,
      });
      setReportItem({ ...reportItem, likeCnt: reportItem.likeCnt + 1 });
      setLike(true);
    } else {
      call("/report/like-cancle", "PUT", {
        ...reportItem,
        likeCnt: reportItem.likeCnt - 1,
      });
      setReportItem({ ...reportItem, likeCnt: reportItem.likeCnt - 1 });
      setLike(false);
    }
  };

  const deleteReport = () => {
    call("/report", "DELETE", reportItem).then((response) => {
      console.log(response);
    });
  };
  useEffect(() => {
    call(`/report/select?id=${searchParams.get("id")}`, "GET").then(
      (response) => {
        setReportItem(response.data[0]);
        console.log("detail response: ", response);
      }
    );
    if (isLoggedIn) {
      // 내 기록 유무, 좋아요 여부 조회
      call(`/report/check?id=${searchParams.get("id")}`, "GET").then(
        (response) => {
          console.log(response);
          setIsMyReport(response[0]);
          setLike(response[1]);
        }
      );
    }
  }, []);

  useEffect(() => {
    console.log(reportItem);
  }, [reportItem]);

  return (
    <>
      {reportItem && (
        <div className={styles["report"]}>
          <div className={styles["report-wapper"]}>
            <button
              className={styles["back-btn"]}
              onClick={() => {
                navigate(-1);
              }}
            >
              <MdOutlineKeyboardDoubleArrowLeft
                className={styles["back-arrow"]}
                size={40}
              />
              <div className={styles["text-list"]}>목록</div>
            </button>
            <div className={styles["report-header"]}>
              <div className={styles["header-line"]}>
                <div className={styles["title"]}>{reportItem.title}</div>
                <div className={styles["created-time"]}>
                  {reportItem.createdAt.substr(0, 10)}
                </div>
              </div>
              <div>
                <div className={styles["booktitle"]}>
                  {reportItem.bookTitle}
                </div>
                <div className={styles["view-like-lock"]}>
                  <div className={styles["lock"]}>
                    {isMyReport && (
                      <>
                        {reportItem.publicOrPrivate ? (
                          <>
                            <span>
                              <FaUnlock
                                size={window.innerWidth <= 600 ? 15 : 22}
                              />
                            </span>
                            <span>공개</span>
                          </>
                        ) : (
                          <>
                            <span>
                              <FaLock
                                size={window.innerWidth <= 600 ? 15 : 20}
                              />
                            </span>
                            <span>비공개</span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className={styles["like"]}>
                    <span
                      onClick={handleLikeClick}
                      style={{
                        color: like
                          ? "rgb(234, 83, 108)"
                          : "rgb(138, 138, 138)",
                      }}
                    >
                      <IoIosHeart
                        size={window.innerWidth <= 600 ? 17 : 22}
                        className={styles["heart"]}
                      />
                    </span>

                    <span>{reportItem.likeCnt}</span>
                  </div>
                  <div className={styles["view"]}>
                    <span>
                      <FaRegEye size={window.innerWidth <= 600 ? 17 : 20} />
                    </span>

                    <span>{reportItem.views}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["report-content"]}>{reportItem.content}</div>
            {isMyReport && (
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
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ReportDetailPage;
