import styles from "./SearchResultPage.module.css";
import { useSearchParams } from "react-router-dom";
import { searchBook } from "../../service/ApiService";
import { useEffect, useRef, useState } from "react";
import SearchBook from "../../components/SearchBook/SearchBook";
import BookModalComp from "./searchresultpage-comps/BookModalComp";

function SearchResultPage() {
  const [searchParmas] = useSearchParams();
  const query = searchParmas.get("query");

  const [books, setBooks] = useState(null);
  const [selectdBook, setSelectedBook] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const bookClickHandler = (book) => {
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
      <>
        <p>loading..</p>
      </>
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
      <ul className={styles["ul"]}>
        {books?.map((book) => {
          return (
            <>
              <li
                className={styles["book"]}
                onClick={() => {
                  bookClickHandler(book);
                }}
                key={book.title}
              >
                <img src={book.image} className={styles["book-img"]} />
                <li className={styles["title"]}>{book.title}</li>
                <li>{book.author}</li>
                <li>{book.publisher}</li>
                <li className={styles["enter"]}></li>
              </li>
            </>
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
