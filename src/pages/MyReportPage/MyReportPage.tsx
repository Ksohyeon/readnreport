import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MyReportPage.module.css";
import MyBooksComp, { Book } from "./myreportpage-comps/MyBooks/MyBooksComp";
import MyReportsComp from "./myreportpage-comps/MyReports/MyReportsComp";
import MyBookModal from "./myreportpage-comps/MyBookModal/MyBookModal";

function MyReportPage() {
  const [bookModal, setbookModal] = useState(false);
  const [book, setBook] = useState<Book>({
    bookId: "",
    bookTitle: "",
    bookAuthor: "",
    bookDesc: "",
    bookImg: "",
    bookPublisher: "",
    reading: false,
    startDate: "",
    endDate: "",
  });

  return (
    <>
      <div>
        <div className={styles["bs"]}>
          <div className={styles["div1"]}>
            <div className={styles["menu-name"]}>
              <Link className={styles["create-update-btn"]} to="/write">
                독후감 작성
              </Link>
            </div>
            <MyBooksComp
              book={book}
              setbookModal={setbookModal}
              setBook={setBook}
            />
          </div>
        </div>
        <div>
          <MyReportsComp />
        </div>
      </div>
      {bookModal && (
        <div className={styles["modal-wrapper"]}>
          <MyBookModal
            book={book}
            setBook={setBook}
            setbookModal={setbookModal}
          />
        </div>
      )}
    </>
  );
}

export default MyReportPage;
