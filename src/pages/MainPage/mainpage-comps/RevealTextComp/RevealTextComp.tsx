import styles from "./RevealTextComp.module.css";

const RevealTextComp = () => {
  return (
    <div className={styles["text-wrapper"]}>
      <div className={styles["text1"]}></div>
      <div className={styles["text1"]}>R</div>
      <div className={styles["text1"]}>RE</div>
      <div className={styles["text1"]}>REA</div>
      <div className={styles["text1"]}>READ</div>
      <div className={styles["text1"]}>READ&nbsp;</div>
      <div className={styles["text1"]}>READ &</div>
      <div className={styles["text1"]}>READ &&nbsp;</div>
      <div className={styles["text1"]}>READ & R</div>
      <div className={styles["text1"]}>READ & RE</div>
      <div className={styles["text1"]}>READ & REP</div>
      <div className={styles["text1"]}>READ & REPO</div>
      <div className={styles["text1"]}>READ & REPOR</div>
      <div className={styles["text1"]}>READ & REPORT</div>
      <div className={styles["bar"]}>READ & REPORT</div>
    </div>
  );
};

export default RevealTextComp;
