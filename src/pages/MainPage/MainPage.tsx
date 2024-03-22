import React, { useRef } from "react";
import styles from "./MainPage.module.css";
import WellReadBooks from "./mainpage-comps/WellReadBooks/WellReadBooks";
import WellReadReports from "./mainpage-comps/WellReadReports/WellReadReports";
import SearchBook from "../../components/SearchBook/SearchBook";
import CanvasComp from "./mainpage-comps/CamvasComp/CanvasComp";
import RevealTextComp from "./mainpage-comps/RevealTextComp/RevealTextComp";
import BookAnimationComp from "./mainpage-comps/BookAnimationComp/BookAnimationComp";

const MainPage: React.FC = () => {
  const canvasWidth = useRef(
    window.innerWidth > 600
      ? (window.innerHeight / 3) * 2
      : window.innerHeight / 2
  );
  return (
    <>
      <div className={styles["main"]}>
        <div
          className={styles["sky"]}
          style={{
            width: "100vw",
            height: canvasWidth.current,
          }}
        ></div>
        <div
          className={styles["canvas"]}
          style={{
            width: "100vw",
            height: canvasWidth.current,
          }}
        >
          <CanvasComp />
        </div>
        <div className={styles["reveal-text"]}>
          <RevealTextComp />
        </div>
        <div className={styles["book"]}>
          <BookAnimationComp />
        </div>
        <div className={styles["search-bar"]}>
          <SearchBook />
        </div>
        <div className={styles["ground"]}></div>
        <div className={styles["slide"]}>
          <WellReadBooks />
        </div>
        <div className={styles["reports"]}>
          <WellReadReports />
        </div>
      </div>
    </>
  );
};

export default MainPage;
