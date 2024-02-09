import styles from "./Report.module.css";

export default function Report({
  title,
  bookTitle,
  createdAt,
  views,
  likeCnt,
}) {
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
