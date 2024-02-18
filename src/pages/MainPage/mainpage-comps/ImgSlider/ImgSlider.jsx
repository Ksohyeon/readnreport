import { useEffect, useRef, useState } from "react";
import styles from "./ImgSlider.module.css";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

function ImgSlider({ books }) {
  const [slideFocus, setSlideFocus] = useState(true);
  const [slideX, setSlideX] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const handleAnimate = useRef(true);
  const slideCount = 3;
  const windowWidth = window.innerWidth;
  const slideWidth = windowWidth > 992 ? 200 : windowWidth < 600 ? 100 : 120;
  const slideMargin = windowWidth > 992 ? 30 : windowWidth < 600 ? 15 : 18;
  const slideArrow = windowWidth > 992 ? 45 : windowWidth < 600 ? 30 : 36;
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
    document.getElementById("slide").addEventListener("mouseover", () => {
      setSlideFocus(true);
    });
    document.getElementById("slide").addEventListener("mouseout", () => {
      setSlideFocus(false);
    });
    let timer = setTimeout(() => {
      goToNext();
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [currentIdx]);

  return (
    <>
      <div id="slide" className={styles["slide"]}>
        <div
          id="arrow"
          className={`${styles.arrowwrapper} ${
            slideFocus ? styles.appear : styles.disappear
          }`}
          style={{ opacity: slideFocus ? 1 : 0 }}
        >
          <IoIosArrowDropleft
            onClick={goToPrevious}
            size={slideArrow}
            className={styles["arrow"]}
          />
          <IoIosArrowDropright
            onClick={goToNext}
            className={styles["arrow"]}
            size={slideArrow}
          />
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
      </div>
    </>
  );
}

export default ImgSlider;
