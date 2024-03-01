import React from "react";
import ImgSlider from "../ImgSlider/ImgSlider";
import styles from "./WellReadBooks.module.css";

function WellReadBooks() {
  const books = [
    {
      title: "도시와 그 불확실한 벽",
      url: "https://image.yes24.com/goods/122090075/L",
    },
    {
      title: "퓨처 셀프",
      url: "https://image.yes24.com/goods/122090360/L",
    },
    {
      title: "세이노의 가르침",
      url: "https://image.yes24.com/goods/117014613/L",
    },
    {
      title: "일론 머스크",
      url: "https://image.yes24.com/goods/121946952/L",
    },
    {
      title: "디케의 눈물",
      url: "https://image.yes24.com/goods/122091079/L",
    },
    {
      title: "푸바오, 매일매일 행복해",
      url: "https://image.yes24.com/goods/122337842/L",
    },
  ];
  return (
    <div className={styles["wrb"]}>
      <div className={styles["text1"]}>많이읽는 도서</div>
      <ImgSlider books={books} />
    </div>
  );
}

export default WellReadBooks;
