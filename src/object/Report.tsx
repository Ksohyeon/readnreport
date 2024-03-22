import { useCallback } from "react";
import styles from "./Report.module.css";
import { IoIosHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";

interface ReportItf {
  title: string;
  bookTitle: string;
  createdAt: string;
  views: number;
  likeCnt: number;
}

function Report({ title, bookTitle, createdAt, views, likeCnt }: ReportItf) {
  const handleClickReport = useCallback(() => {}, []);

  return (
    <li onClick={handleClickReport} className={styles["report"]}>
      <div className={styles["title"]}>{title}</div>
      <ul>
        <li>{bookTitle}</li>
        <li>{createdAt.substr(0, 10)}</li>
        <li>
          <FaRegEye
            size={window.innerWidth <= 600 ? 15 : 20}
            style={{ marginRight: "2px" }}
          />{" "}
          {views}
          <span>
            <div className={styles["like"]}>
              <IoIosHeart
                color="rgb(204, 38, 38)"
                size={window.innerWidth <= 600 ? 15 : 20}
                style={{ marginRight: "3px" }}
              />
              {likeCnt}
            </div>
          </span>
        </li>
      </ul>
    </li>
  );
}

export default Report;
