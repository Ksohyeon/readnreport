import { useLocation } from "react-router-dom";
import styles from "./CreateReportPage.module.css";
import { useEffect, useState } from "react";
import { call } from "../../service/ApiService";

function WriteReportPage() {
  const [reportItem, setReportItem] = useState();
  const [createOrUpdate, setCreatedOrUpdate] = useState(false);

  // 생성, 수정 구분
  const location = useLocation();
  useEffect(() => {
    setCreatedOrUpdate(!location.state?.report);
    setReportItem(
      location.state?.report ? JSON.parse(location.state?.report) : null
    );
  }, [location.state?.report]);

  useEffect(() => {
    console.log("createOrUpdate: ", createOrUpdate);
    console.log("reportItem: ", reportItem, " type: ", typeof reportItem);
  }, [createOrUpdate, reportItem]);

  const create = () => {
    call("/report", "POST", reportItem).then((response) => {
      window.location.href = "/bookshelf";
    });
  };

  const update = () => {
    call("/report", "PUT", reportItem).then((response) => {
      window.location.href = `/detail?id=${reportItem?.id}`;
    });
  };

  const bookTitleChangeHandler = (event) => {
    setReportItem({ ...reportItem, bookTitle: event.target.value });
  };

  const reportTitleChangeHandler = (event) => {
    setReportItem({ ...reportItem, title: event.target.value });
  };

  const contentChangeHandler = (event) => {
    setReportItem({ ...reportItem, content: event.target.value });
  };

  const isPublicChanceHandler = () => {
    setReportItem({
      ...reportItem,
      publicOrPrivate: !reportItem?.publicOrPrivate,
    });
  };

  return (
    <div className={styles["wr"]}>
      <div className={styles["header"]}>
        {createOrUpdate && (
          <div onClick={create} className={styles["save-btn"]}>
            저&nbsp; &nbsp; &nbsp; &nbsp;장
          </div>
        )}
        {!createOrUpdate && (
          <div onClick={update} className={styles["save-btn"]}>
            수&nbsp; &nbsp; &nbsp; &nbsp;정
          </div>
        )}
      </div>
      {(createOrUpdate || reportItem) && (
        <div className={styles["form"]}>
          <div className={styles["title"]}>
            <input
              value={reportItem?.bookTitle || " "}
              onChange={bookTitleChangeHandler}
              type="text"
              placeholder="책 제목"
              className={styles["btw-input"]}
            ></input>
            <div className={styles["space"]}></div>
            <input
              value={reportItem?.title || " "}
              onChange={reportTitleChangeHandler}
              type="text"
              placeholder="독후감 제목"
              className={styles["btw-input"]}
            ></input>
            <div className={styles["public-private-btn"]}>
              {reportItem?.publicOrPrivate && (
                <button onClick={isPublicChanceHandler}>공개</button>
              )}
              {!reportItem?.publicOrPrivate && (
                <button onClick={isPublicChanceHandler}>비공개</button>
              )}
            </div>
          </div>
          <div className={styles["report-content"]}>
            <textarea
              value={reportItem?.content || " "}
              onChange={contentChangeHandler}
              type="text"
              className={styles["content-input"]}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
}

export default WriteReportPage;
