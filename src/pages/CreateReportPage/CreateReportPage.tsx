import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./CreateReportPage.module.css";
import { useEffect, useState } from "react";
import { call } from "../../service/ApiService";

interface Report {
  id?: number | undefined;
  title: string;
  bookTitle: string;
  publicOrPrivate: boolean;
  content: string;
}

const WriteReportPage: React.FC = () => {
  const [reportItem, setReportItem] = useState<Report>({
    id: undefined,
    title: "",
    bookTitle: "",
    publicOrPrivate: true,
    content: "",
  });
  const [createOrUpdate, setCreatedOrUpdate] = useState(true);

  const create = () => {
    call("/report", "POST", reportItem).then((response) => {
      window.location.href = "/bookshelf";
    });
  };

  const update = () => {
    call("/report", "PUT", reportItem).then((response) => {
      if (reportItem) window.location.href = `/detail?id=${reportItem.id}`;
    });
  };

  // 생성, 수정 구분
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.report) {
      setCreatedOrUpdate(false);
      setReportItem(
        location.state.report ? JSON.parse(location.state.report) : null
      );
    }
  }, [location.state]);

  const bookTitleChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setReportItem((prevReport) =>
      prevReport ? { ...prevReport, bookTitle: event.target.value } : prevReport
    );
  };

  const reportTitleChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setReportItem((prevReport) =>
      prevReport ? { ...prevReport, title: event.target.value } : prevReport
    );
  };

  const contentChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setReportItem((prevReport) =>
      prevReport ? { ...prevReport, content: event.target.value } : prevReport
    );
  };

  const isPublicChanceHandler = () => {
    if (reportItem) {
      setReportItem((prevReport) =>
        prevReport
          ? {
              ...prevReport,
              publicOrPrivate: !reportItem.publicOrPrivate,
            }
          : prevReport
      );
    }
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

      <div className={styles["form"]}>
        <div className={styles["title"]}>
          <input
            value={reportItem ? reportItem.title : ""}
            onChange={reportTitleChangeHandler}
            type="text"
            placeholder="독후감 제목"
            className={styles["title-input"]}
          ></input>
          <input
            value={reportItem ? reportItem.bookTitle : ""}
            onChange={bookTitleChangeHandler}
            type="text"
            placeholder="책 제목"
            className={styles["title-input"]}
          ></input>
        </div>
        <div className={styles["public-private-btn"]}>
          {reportItem.publicOrPrivate ? (
            <button onClick={isPublicChanceHandler}>공개</button>
          ) : (
            <button onClick={isPublicChanceHandler}>비공개</button>
          )}
        </div>
        <div className={styles["report-content"]}>
          <textarea
            className={styles["content-input"]}
            value={reportItem ? reportItem.content : " "}
            onChange={contentChangeHandler}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default WriteReportPage;
