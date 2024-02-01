import { useRef, useState, useCallback, useEffect } from "react";
import styles from "./SearchBook.module.css";
import { FaSearch } from "react-icons/fa";
import { throttle } from "lodash";
import { searchBook } from "../../../../service/ApiService";

function SearchBook() {
  const searchContent = useRef("");
  const [referenceItems, setReferenceItems] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit: ", searchContent.current.value);
  };

  const handleChange = useCallback(
    throttle(async () => {
      if (!searchContent) return;
      let searchResult = await searchBook(searchContent.current.value, 5);
      setReferenceItems(searchResult?.items);
    }, 1000),
    []
  );

  const clickEmpty = useCallback(() => {
    if (document.activeElement !== document.getElementById("searchBar")) {
      document.getElementById("recommend").style.display = "none";
    }
  }, []);

  const focusSearchBar = useCallback(() => {
    document.getElementById("recommend").style.display = "inherit";
  }, []);

  useEffect(() => {
    document.addEventListener("click", clickEmpty);
    document
      .getElementById("searchBar")
      .addEventListener("focus", focusSearchBar);
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className={styles["search-bar"]}
      >
        <input
          id="searchBar"
          className={styles["search-input"]}
          type="text"
          ref={searchContent}
          placeholder="책제목 혹은 작가명을 통해 검색하세요"
          autoComplete="off"
        ></input>
        <button type="submit" className={styles["submit"]}>
          <FaSearch className={styles["search-btn"]} />
        </button>
      </form>
      <div className={styles["recommend"]} id="recommend">
        {referenceItems?.map((item) => {
          return (
            <div className={styles["item"]} key={item.isbn}>
              <img src={item.image} className={styles["book-img"]} />
              <span></span>
              <span className={styles["title"]}>{item.title}</span>
              <span className={styles["author"]}>{item.author}</span>
              {/* <span className={styles["text1"]}></span> */}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SearchBook;
