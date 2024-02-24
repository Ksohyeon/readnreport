import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MyReportPage.module.css";
import { ImBookmark } from "react-icons/im";
import { call } from "../../service/ApiService";
import { useQuery } from "@tanstack/react-query";

const reportPerPage = 10;

function MyReportPage() {
  const [books, setBooks] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["reports", currentPage],
    queryFn: () => call(`/report?display=${reportPerPage}&page=${currentPage}`),
    staleTime: 2000,
  });

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

  useEffect(() => {
    call("/mybook/all", "GET").then((response) => {
      console.log(response);
      setBooks(response?.data);
    });
  }, []);

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
            {books &&
              books.map((book) => {
                const color =
                  "#" + parseInt(Math.random() * 0xffffff).toString(16);
                return (
                  <div
                    key={book.bookId}
                    className={styles["book"]}
                    style={{ backgroundColor: color }}
                  >
                    {book.bookTitle}
                  </div>
                );
              })}
            <ImBookmark className={styles["bookmark"]} size={80} />
          </div>
        </div>
      </div>
      <div className={styles["div2"]}>
        <div className={styles["reports"]}>
          {!isLoading &&
            data.reports.map((report) => {
              return (
                <div className={styles["report"]}>
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
    </div>
  );
}

export default MyReportPage;
