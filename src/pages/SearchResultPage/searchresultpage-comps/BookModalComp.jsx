import { useState } from "react";
import styles from "./BookModalComp.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

function BookModalComp({ book, setModalOpen }) {
  const [open, setOpen] = useState(true);
  const modalHandler = () => {
    setOpen(false);
    setTimeout(() => {
      setModalOpen(false);
    }, 500);
  };
  return (
    <div className={`${styles.modal} ${open ? styles.open : styles.close}`}>
      <ul className={styles["book"]}>
        <li>
          <IoIosCloseCircleOutline
            onClick={modalHandler}
            className={styles["close-btn"]}
          />
        </li>
        <li>
          <img src={book.image} className={styles["book-img"]} />
        </li>
        <li>{book.title}</li>
        <li>{book.author}</li>
        <li>{book.publisher}</li>
        <li>{book.description}</li>
      </ul>
    </div>
  );
}

export default BookModalComp;
