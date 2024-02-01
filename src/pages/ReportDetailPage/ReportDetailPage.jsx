import { Link, useSearchParams } from "react-router-dom";
import styles from "./ReportDetailPage.module.css";
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

  const isPublicChanceHandler = () => {
    setReportItem({
      ...reportItem,
      publicOrPrivate: !reportItem.publicOrPrivate,
    });
  };

  const deleteReport = () => {
    call("/report", "DELETE", reportItem).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <Link to={{ pathname: "/bookshelf" }}>
        <button>목록</button>
      </Link>
      {reportItem && (
        <div className={styles["report"]}>
          <div>{reportItem.title}</div>
          <div>{reportItem.bookTitle}</div>
          <div>{reportItem.views}</div>
          <div>{reportItem.likeCnt}</div>
          {reportItem.publicOrPrivate && (
            <button onClick={isPublicChanceHandler}>공개</button>
          )}
          {!reportItem.publicOrPrivate && (
            <button onClick={isPublicChanceHandler}>비공개</button>
          )}
          <div>{reportItem.createdAt}</div>
          <div>{reportItem.content}</div>
          <Link to={"/write"} state={{ report: JSON.stringify(reportItem) }}>
            <button>수정</button>
          </Link>
          <Link to={"/bookshelf"}>
            <button onClick={deleteReport}>삭제</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default ReportDetailPage;
