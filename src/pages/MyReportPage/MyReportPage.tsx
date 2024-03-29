import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MyReportPage.module.css";
import MyBooksComp, { Book } from "./myreportpage-comps/MyBooks/MyBooksComp";
import MyReportsComp from "./myreportpage-comps/MyReports/MyReportsComp";
import MyBookModal from "./myreportpage-comps/MyBookModal/MyBookModal";
import { useDispatch } from "react-redux";
import { closeSideBar } from "features/sideBar/sideBarSlice";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeSideBar());
  }, []);

  return (
    <>
      <div className={styles["page"]}>
        <div className={styles["bookshelf"]}>
          <Link className={styles["create-update-btn"]} to="/write">
            독후감 작성
          </Link>
          <MyBooksComp
            book={book}
            setbookModal={setbookModal}
            setBook={setBook}
          />
        </div>
        <div className="reports">
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
