import { useRef, useState } from "react";
import styles from "./ImgSlider.module.css";

function ImgSlider({ books }) {
  const [slideX, setSlideX] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const handleAnimate = useRef(true);
  const slideCount = 3;
  const slideWidth = 200;
  const slideMargin = 30;
  const slides = [...books, ...books, ...books];

  const moveSlide = function (num) {
    setSlideX(-num * (slideWidth + slideMargin));
    setCurrentIdx(num);

    if (num === slideCount * 2 || num === -slideCount * 2) {
      setTimeout(() => {
        handleAnimate.current = false;
        setSlideX(0);
        setCurrentIdx(0);
      }, 500);
      setTimeout(() => {
        handleAnimate.current = true;
      }, 600);
    }
  };

  const goToPrevious = () => {
    moveSlide(currentIdx - 1);
  };

  const goToNext = () => {
    moveSlide(currentIdx + 1);
  };

  let timer = undefined;

  const autoSlide = function () {
    if (timer === undefined) {
      timer = setInterval(() => {
        moveSlide(currentIdx + 1);
      }, 5000);
    }
  };
  // autoSlide();

  return (
    <>
      <div className={styles["slide"]}>
        <div className={styles["prev"]} onClick={goToPrevious}>
          &#60;
        </div>
        <div className={styles["slide-wrapper"]}>
          <ul
            className={`${styles.slides} ${
              handleAnimate.current ? styles.animated : ""
            }`}
            style={{
              left: slideX,
            }}
          >
            {slides?.map((book) => {
              return (
                <li key={book.title}>
                  <img
                    className={styles["book-img"]}
                    src={book.url}
                    alt={book.url}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles["next"]} onClick={goToNext}>
          &#62;
        </div>
      </div>
    </>
  );
}

export default ImgSlider;