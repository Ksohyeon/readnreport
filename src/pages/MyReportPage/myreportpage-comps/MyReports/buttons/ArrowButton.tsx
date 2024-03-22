import styles from "./ArrowButton.module.css";

const PrevButton = () => {
  return (
    <div className={styles.button}>
      <span className={styles.arr1}></span>
      <span className={styles.arr2}></span>
    </div>
  );
};

export default PrevButton;
