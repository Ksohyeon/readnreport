import { useEffect, useRef, useState } from "react";
import styles from "./ImgSlider.module.css";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";

function ImgSlider({ books }) {
  const [slideX, setSlideX] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const handleAnimate = useRef(true);
  const slideCount = 3;
  const slideWidth = 200;
  const slideMargin = 30;
  const slides = [...books, ...books, ...books];

  useEffect(() => {
    setSlideX(-currentIdx * (slideWidth + slideMargin));

    let timer1 = undefined;
    if (currentIdx === slideCount * 2 || currentIdx === -slideCount * 2) {
      timer1 = setTimeout(() => {
        handleAnimate.current = false;
        setSlideX(0);
        setCurrentIdx(0);
      }, 500);
    }
    return () => {
      clearTimeout(timer1);
    };
  }, [currentIdx]);

  const goToPrevious = () => {
    handleAnimate.current = true;
    setCurrentIdx(currentIdx - 1);
  };

  const goToNext = () => {
    handleAnimate.current = true;
    setCurrentIdx(currentIdx + 1);
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      goToNext();
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [currentIdx]);

  return (
    <>
      <div className={styles["slide"]}>
        <div className={styles["prev"]} onClick={goToPrevious}>
          <BiSolidLeftArrow className={styles["arrow"]} />
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
            {slides?.map((book, index) => {
              return (
                <li key={index}>
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
        <div onClick={goToNext}>
          <BiSolidRightArrow className={styles["arrow"]} />
        </div>
      </div>
    </>
  );
}

export default ImgSlider;
