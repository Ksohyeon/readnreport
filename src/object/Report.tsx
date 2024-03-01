import styles from "./Report.module.css";

interface ReportItf {
  title: string;
  bookTitle: string;
  createdAt: string;
  views: number;
  likeCnt: number;
}

function Report({ title, bookTitle, createdAt, views, likeCnt }: ReportItf) {
  return (
    <li className={styles["report"]}>
      <div className={styles["title"]}>{title}</div>
      <ul>
        <li>{bookTitle}</li>
        <li>{createdAt.substr(0, 10)}</li>
        <li>views {views}</li>
        <li>like {likeCnt}</li>
      </ul>
    </li>
  );
}

export default Report;
