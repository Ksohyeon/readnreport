import styles from "./MyBooksComp.module.css";
import { ImBookmark } from "react-icons/im";
import { useEffect, useState } from "react";
import { call } from "service/ApiService";

interface Book {
  bookId: string;
  bookTitle: string;
}
type Books = Book[];

function MyBooksComp() {
  const [books, setBooks] = useState<Books>();

  useEffect(() => {
    call("/mybook/all", "GET").then((response) => {
      setBooks(response.data);
    });
  }, []);

  return (
    <div className={styles["book-shelf"]}>
      {books &&
        books.map((book) => {
          const color =
            "#" + parseInt((Math.random() * 0xffffff).toString()).toString(16);
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
  );
}

export default MyBooksComp;
