import styles from "./ButtonComp.module.css";

const ButtonComp = ({ content }: { content: string }) => {
  return (
    <div className={styles["button"]}>
      {content} <span className={styles["border"]}></span>
      <span className={styles["border"]}></span>
      <span className={styles["border"]}></span>
      <span className={styles["border"]}></span>
    </div>
  );
};

export default ButtonComp;
