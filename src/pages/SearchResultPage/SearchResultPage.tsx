import styles from "./SearchResultPage.module.css";
import { useSearchParams } from "react-router-dom";
import { searchBook } from "../../service/ApiService";
import { useEffect, useState } from "react";
import SearchBook from "../../components/SearchBook/SearchBook";
import BookModalComp from "./searchresultpage-comps/BookModalComp";

export interface Book {
  title: string;
  author: string;
  publisher: string;
  description: string;
  image: string;
  isbn: number;
}

type Books = Book[];

function SearchResultPage() {
  const [searchParmas] = useSearchParams();
  const query = searchParmas.get("query") || "";

  const [books, setBooks] = useState<Books>();
  const [selectdBook, setSelectedBook] = useState<Book>({
    title: "",
    author: "",
    publisher: "",
    description: "",
    image: "",
    isbn: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const bookClickHandler = (book: Book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  useEffect(() => {
    (async function () {
      const search = await searchBook(query, 20);
      console.log(search.items);
      setBooks(search.items);
    })();
  }, []);

  if (books == null)
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>loading..</p>
      </div>
    );

  if (books.length === 0) {
    return (
      <div className={styles["no-result-wrapper"]}>
        <div className={styles["searchbook"]}>
          <SearchBook />
        </div>
        <div className={styles["no-result"]}>검색 결과가 없습니다</div>
      </div>
    );
  }

  return (
    <>
      <div className={styles["searchbook"]}>
        <SearchBook />
      </div>
      <ul className={styles["books"]}>
        {books &&
          books.map((book) => {
            return (
              <li
                className={styles["book"]}
                onClick={() => {
                  bookClickHandler(book);
                }}
                key={book.isbn}
              >
                <img src={book.image} className={styles["book-img"]} />
                <div className={styles["title"]}>{book.title}</div>
                <div>{book.author}</div>
                <div>{book.publisher}</div>
                <div className={styles["enter"]}></div>
              </li>
            );
          })}
      </ul>

      {modalOpen && (
        <div className={`${styles.modalwrapper}`}>
          <div className={styles["modal"]}>
            <BookModalComp book={selectdBook} setModalOpen={setModalOpen} />
          </div>
        </div>
      )}
    </>
  );
}

export default SearchResultPage;
