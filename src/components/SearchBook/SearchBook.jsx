import { useRef, useState, useCallback, useEffect } from "react";
import styles from "./SearchBook.module.css";
import { FaSearch } from "react-icons/fa";
import { throttle } from "lodash";
import { searchBook } from "../../service/ApiService";
import { useNavigate } from "react-router-dom";

function SearchBook() {
  const searchContent = useRef();
  const [referenceItems, setReferenceItems] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = useCallback(
    throttle(async () => {
      if (!searchContent?.current?.value) return;
      let searchResult = await searchBook(searchContent.current.value, 5);
      console.log(searchResult);
      setReferenceItems(searchResult?.items);
    }, 1000),
    [searchContent]
  );

  const clickEmpty = useCallback(() => {
    if (document.activeElement !== document.getElementById("searchBar")) {
      if (!document.getElementById("recommend")) return;
      document.getElementById("recommend").style.visibility = "hidden";
    }
  }, []);

  const focusSearchBar = useCallback(() => {
    document.getElementById("recommend").style.visibility = "visible";
  }, []);

  useEffect(() => {
    document.addEventListener("click", clickEmpty);
    document
      .getElementById("searchBar")
      .addEventListener("focus", focusSearchBar);
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Enter" &&
        document.activeElement.id === "searchBar" &&
        searchContent.current != undefined &&
        searchContent.current.value !== ""
      ) {
        console.log(searchContent.current.value);
        const query = searchContent.current.value;
        let flag = false;
        if (window.location.pathname === "/search-result") flag = true;
        navigate({
          pathname: "/search-result",
          search: `?query=${query}`,
        });
        if (flag) window.location.reload();
      }
    });
  }, [clickEmpty, focusSearchBar]);

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
          const idx = item.title.indexOf(searchContent.current.value);
          const before = item.title.substring(0, idx);
          const after = item.title.substring(idx + 1);
          return (
            <div className={styles["item"]} key={item.isbn}>
              <div className={styles["img"]}>
                <img
                  src={item.image}
                  className={styles["book-img"]}
                  alt={item.title}
                />
              </div>
              <div className={styles["title"]}>
                {before}
                <span className={styles["text1"]}>
                  {searchContent.current.value}
                </span>
                {after}
              </div>
              <span className={styles["author"]}>{item.author}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SearchBook;
