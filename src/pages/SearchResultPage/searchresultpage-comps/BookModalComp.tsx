import { useEffect, useRef, useState } from "react";
import styles from "./BookModalComp.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { call } from "../../../service/ApiService";
import { useSelector } from "react-redux";
import React from "react";
import { Book } from "../SearchResultPage";

interface OwnProps {
  book: Book;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginState {
  auth: {
    isLoggedIn: boolean;
  };
}

function BookModalComp({ book, setModalOpen }: OwnProps) {
  const isLoggedIn = useSelector((state: LoginState) => state.auth.isLoggedIn);
  const bookRef = useRef();
  const [isInBookShelf, setIsInBookShelf] = useState(false);
  const [open, setOpen] = useState(true);

  const addBookHandler = () => {
    if (isInBookShelf) {
      call("/mybook", "DELETE", bookRef.current);
    } else {
      const bookObj = {
        bookTitle: book.title,
        bookAuthor: book.author,
        bookPublisher: book.publisher,
        bookImg: book.image,
        bookDesc: book.description,
        reading: false,
      };
      const response = call("/mybook", "POST", bookObj);
    }
    setIsInBookShelf((prev) => !prev);
  };

  const modalHandler = () => {
    setOpen(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | number;
    if (!open) {
      timer = setTimeout(() => {
        setModalOpen(false);
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    if (isLoggedIn) {
      call(`/mybook?title=${book.title}`, "GET").then((response) => {
        console.log(response.data[0]);
        if (response.data[0] != null) {
          setIsInBookShelf(true);
          bookRef.current = response.data[0];
        }
      });
    }
  }, []);

  return (
    <div className={`${styles.modal} ${open ? styles.open : styles.close}`}>
      <ul className={styles["book"]}>
        <li>
          <img src={book.image} className={styles["book-img"]} />
        </li>
        <li>
          <IoIosCloseCircleOutline
            onClick={modalHandler}
            className={styles["close-btn"]}
          />
        </li>
        <li className={styles["book-title"]}>{book.title}</li>
        <li>{book.author}</li>
        <li>{book.publisher}</li>
        {isLoggedIn && (
          <li className={styles["option-btns"]}>
            <button
              onClick={addBookHandler}
              className={styles[`${isInBookShelf ? "chosen" : ""}`]}
            >
              {isInBookShelf ? "책장에서 제거" : "책장에 추가"}
            </button>
          </li>
        )}
        <li>{book.description}</li>
      </ul>
    </div>
  );
}

export default BookModalComp;
