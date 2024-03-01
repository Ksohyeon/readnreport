import { useEffect, useState } from "react";
import styles from "./MyReportsComp.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { call } from "service/ApiService";
import { Link } from "react-router-dom";

interface Report {
  id: string;
  title: string;
  bookTitle: string;
  views: number;
  likeCnt: number;
  createdAt: string;
}

const reportPerPage = 10;

function MyReportsComp() {
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
      call(`/report?display=${reportPerPage}&page=${currentPage}`, "GET"),
    staleTime: 2000,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && data.next !== -1) {
      queryClient.prefetchQuery({
        queryKey: ["reports", data.next],
        queryFn: () =>
          call(`/report?display=${reportPerPage}&page=${data.next}`, "GET"),
      });
    }
  }, [currentPage, queryClient]);

  return (
    <>
      <div className={styles["div2"]}>
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
                    <div className={styles["report-content"]}>
                      <div>{report.title}</div>
                      <div>{report.bookTitle}</div>
                      <div>{report.views}</div>
                      <div>{report.likeCnt}</div>
                      <div>{report.createdAt.slice(0, 10)}</div>
                      <div></div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles["btns"]}>
        <button onClick={prevHandler}>prev</button>
        <button onClick={nextHandler}>next</button>
      </div>
    </>
  );
}

export default MyReportsComp;
