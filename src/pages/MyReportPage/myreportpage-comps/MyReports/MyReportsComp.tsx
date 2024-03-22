import { useEffect, useRef, useState } from "react";
import styles from "./MyReportsComp.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { call } from "service/ApiService";
import { Link } from "react-router-dom";
import ArrowButton from "./buttons/ArrowButton";
import Report from "object/Report";

interface Report {
  id: string;
  title: string;
  bookTitle: string;
  views: number;
  likeCnt: number;
  createdAt: string;
}

function MyReportsComp() {
  const reportPerPage = useRef<number>(window.innerWidth <= 600 ? 9 : 10);
  const [currentPage, setCurrentPage] = useState(1);

  const prevHandler = () => {
    if (currentPage !== 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const nextHandler = () => {
    if (data.next !== -1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["reports", currentPage],
    queryFn: () =>
      call(
        `/report?display=${reportPerPage.current}&page=${currentPage}`,
        "GET"
      ),
    staleTime: 2000,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && data.next !== -1) {
      queryClient.prefetchQuery({
        queryKey: ["reports", data.next],
        queryFn: () =>
          call(
            `/report?display=${reportPerPage.current}&page=${data.next}`,
            "GET"
          ),
      });
    }
  }, [currentPage, queryClient]);

  return (
    <>
      <div className={`${styles["reports-wrapper"]}`}>
        <div className={styles["reports"]}>
          {!isLoading &&
            data.reports.map((report: Report) => {
              return (
                <div className={styles["report"]} key={report.id}>
                  <Link
                    key={report.id}
                    to={{
                      pathname: "/detail",
                      search: `?id=${report.id}`,
                    }}
                  >
                    <Report
                      title={report.title}
                      bookTitle={report.bookTitle}
                      createdAt={report.createdAt}
                      views={report.views}
                      likeCnt={report.likeCnt}
                    />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles["btns"]}>
        <div className={styles["prev-btn"]} onClick={prevHandler}>
          {currentPage > 1 && (
            <>
              <div className={styles["prev-arrow"]}>
                <ArrowButton />
              </div>
              <div className={styles["prev-text"]}>prev</div>
            </>
          )}
        </div>
        <span className={styles["page-num"]}>{currentPage}</span>
        <div className={styles["next-btn"]} onClick={nextHandler}>
          {data && data.next !== -1 && (
            <>
              <div className={styles["next-arrow"]}>
                <ArrowButton />
              </div>
              <div className={styles["next-text"]}>next</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyReportsComp;
