import { call } from "service/ApiService";
import { Book } from "../MyBooks/MyBooksComp";
import styles from "./MyBookModal.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";

interface OwnProps {
  book: Book;
  setBook: React.Dispatch<React.SetStateAction<Book>>;
  setbookModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyBookModal = ({ book, setBook, setbookModal }: OwnProps) => {
  const [isInBookShelf, setIsInBookShelf] = useState(true);
  const [open, setOpen] = useState(true);

  const closeModalHandler = () => {
    setBook({
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
    setOpen(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | number;
    if (!open) {
      timer = setTimeout(() => {
        setbookModal(false);
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  const bookHandler = () => {
    if (isInBookShelf) {
      call("/mybook", "DELETE", book);
    } else {
      const response = call("/mybook", "POST", book);
    }
    setIsInBookShelf((prev) => !prev);
  };

  const startHandler = () => {
    call(`/mybook/start?book-id=${book.bookId}`, "PUT").then((response) => {
      console.log(response.data);
      setBook(response.data[0]);
    });
  };

  const endHandler = () => {
    call(`/mybook/end?book-id=${book.bookId}`, "PUT").then((response) => {
      console.log(response.data);
      setBook(response.data[0]);
    });
  };

  return (
    <>
      <div
        className={`${styles["modal"]} ${
          open ? styles["open"] : styles["close"]
        } `}
      >
        <IoIosCloseCircleOutline
          onClick={closeModalHandler}
          className={styles["close-btn"]}
          size={30}
        >
          close
        </IoIosCloseCircleOutline>
        <ul>
          <li>
            <img src={book.bookImg} className={styles["book-img"]} />
          </li>
          <li>{book.bookTitle}</li>
          <li>{book.bookAuthor}</li>
          <li>{book.bookPublisher}</li>
          <li>
            <button
              onClick={bookHandler}
              className={styles[`${isInBookShelf ? "chosen" : ""}`]}
            >
              {isInBookShelf ? "책장에서 제거" : "책장에 추가"}
            </button>
          </li>
          {book.reading ? (
            <>
              <li>
                <button onClick={endHandler}>읽기 완료</button>
              </li>
              <li>시작일 {book.startDate.substring(0, 10)}</li>
              <li>{book.endDate}</li>
            </>
          ) : book.endDate ? (
            <>
              <li>시작일 {book.startDate.substring(0, 10)}</li>
              <li>종료일 {book.endDate.substring(0, 10)}</li>
            </>
          ) : (
            <li>
              <button onClick={startHandler}>읽기 시작</button>
            </li>
          )}
          <li>{book.bookDesc}</li>
        </ul>
      </div>
    </>
  );
};

export default MyBookModal;
