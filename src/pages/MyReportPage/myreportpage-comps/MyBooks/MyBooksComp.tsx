import styles from "./MyBooksComp.module.css";
import { ImBookmark } from "react-icons/im";
import { useEffect, useState } from "react";
import { call } from "service/ApiService";

export interface Book {
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookPublisher: string;
  bookImg: string;
  bookDesc: string;
  reading: boolean;
  startDate: string;
  endDate: string;
}
type Books = Book[];

interface OwnProps {
  book: Book;
  setBook: React.Dispatch<React.SetStateAction<Book>>;
  setbookModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function MyBooksComp({ setbookModal, setBook, book }: OwnProps) {
  const [books, setBooks] = useState<Books>();

  useEffect(() => {
    call("/mybook/all", "GET").then((response) => {
      setBooks(response.data);
    });
  }, [book]);

  const bookClickHandler = (book: Book) => {
    setbookModal((prev) => !prev);
    setBook(book);
  };

  return (
    <div className={styles["bookshelf-wrapper"]}>
      <ImBookmark className={styles["bookmark"]} size={70} />
      <div className={styles["book-shelf"]}>
        <div className={styles["book-wrapper"]}>
          {books &&
            books.map((book) => {
              return (
                <div
                  key={book.bookId}
                  className={styles["book"]}
                  onClick={() => bookClickHandler(book)}
                >
                  {book.bookTitle}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MyBooksComp;
