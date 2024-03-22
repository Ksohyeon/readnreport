import { useState } from "react";
import styles from "./BookAnimationComp.module.css";
import { Link } from "react-router-dom";

const BookAnimationComp = () => {
  const [isClose, setIsClose] = useState(false);
  return (
    <div className={styles["book-wrapper"]}>
      <Link to="/bookshelf">
        <div className={styles["book"]}>
          <div className={styles["book-joint"]}></div>
          <div
            className={styles["rest-pages"]}
            onMouseEnter={() => {
              setIsClose(false);
            }}
            onMouseLeave={() => {
              setIsClose(true);
            }}
          >
            MY{`\n`}BOOKSHELF
          </div>
          <div
            className={`${styles["page"]} ${isClose ? "" : styles.close}`}
          ></div>
        </div>
      </Link>
    </div>
  );
};

export default BookAnimationComp;
