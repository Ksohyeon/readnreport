import { useState } from "react";
import styles from "./ImgSlider.module.css";

function ImgSlider({ slides }) {
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(1);
  const [thirdIndex, setThirdIndex] = useState(2);

  const slideStyles1 = {
    width: "8vw",
    height: "12vw",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[firstIndex].url})`,
    backgroundRepeat: "no-repeat",
  };
  const slideStyles2 = {
    width: "8vw",
    height: "12vw",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[secondIndex].url})`,
    backgroundRepeat: "no-repeat",
  };
  const slideStyles3 = {
    width: "8vw",
    height: "12vw",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[thirdIndex].url})`,
    backgroundRepeat: "no-repeat",
  };

  const leftArrowStyles = {
    position: "relative",
    fontWeight: "bolder",
    fontSize: "3vw",
  };
  const rightArrowStyles = {
    position: "relative",
    fontWeight: "bolder",
    fontSize: "3vw",
  };

  const goToPrevious = () => {
    setFirstIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setSecondIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setThirdIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setFirstIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setSecondIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setThirdIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className={styles["slider"]}>
        <div style={leftArrowStyles} onClick={goToPrevious}>
          &#60;
        </div>
        <div className={styles["book"]}>
          <div style={slideStyles1}></div>
        </div>
        <div className={styles["book"]}>
          <div style={slideStyles2}></div>
        </div>
        <div className={styles["book"]}>
          <div style={slideStyles3}></div>
        </div>
        <div style={rightArrowStyles} onClick={goToNext}>
          &#62;
        </div>
      </div>
    </>
  );
}

export default ImgSlider;
