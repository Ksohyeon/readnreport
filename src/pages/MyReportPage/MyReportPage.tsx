import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MyReportPage.module.css";
import { call } from "../../service/ApiService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MyBooksComp from "./myreportpage-comps/MyBooks/MyBooksComp";
import MyReportsComp from "./myreportpage-comps/MyReports/MyReportsComp";

interface Report {
  id: string;
  title: string;
  bookTitle: string;
  views: number;
  likeCnt: number;
  createdAt: string;
}

const reportPerPage = 10;

function MyReportPage() {
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
    <div>
      <div className={styles["bs"]}>
        <div className={styles["div1"]}>
          <div className={styles["menu-name"]}>
            <Link className={styles["create-update-btn"]} to="/write">
              독후감 작성
            </Link>
          </div>
          <MyBooksComp />
        </div>
      </div>
      <div>
        <MyReportsComp />
      </div>
    </div>
  );
}

export default MyReportPage;
