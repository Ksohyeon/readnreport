// import ImgSlider from "./ImgSlider";
import styles from "./WellReadReports.module.css";

function WellReadReports() {
  // const reports = [
  //   {
  //     title: "우정에 관하여..",
  //     name: "아몬드",
  //     author: "손원평",
  //     writer: "yam",
  //   },
  // ];
  return (
    <div className={styles["wrr"]}>
      <div className={styles["text1"]}>인기 독후감</div>
      {/* <ImgSlider slides={reports} /> */}
    </div>
  );
}

export default WellReadReports;
