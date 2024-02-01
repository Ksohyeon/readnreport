import { useMemo } from "react";
import styles from "./Keyworeds.module.css";

function Keywords() {
  const keywordRow1 = useMemo(() => {
    return ["소설", "인문", "종교", "과학", "경제/경영"];
  }, []);
  const keywordRow2 = useMemo(() => {
    return ["시/에세이", "예술", "여행", "건강", "가정/육아"];
  }, []);
  const moveByKeyword = (r, c) => {
    console.log(r + " " + c);
  };
  return (
    <div className={styles["kw"]}>
      <div className={styles["text1"]}>독후감 키워드</div>
      <div className={styles["keywords"]}>
        <div className={styles["row"]}>
          {keywordRow1.map((kw, index) => {
            if (index % 2 === 0) {
              return (
                <div
                  key={kw}
                  className={styles["col"]}
                  onClick={() => moveByKeyword(0, index)}
                >
                  {kw}
                </div>
              );
            } else {
              return (
                <div
                  key={kw}
                  className={styles["col"]}
                  style={{ backgroundColor: "rgb(230, 230, 230)" }}
                  onClick={() => moveByKeyword(0, index)}
                >
                  {kw}
                </div>
              );
            }
          })}
        </div>
        <div className={styles["row"]}>
          {keywordRow2.map((kw, index) => {
            if (index % 2 === 1) {
              return (
                <div
                  key={kw}
                  className={styles["col"]}
                  onClick={() => moveByKeyword(1, index)}
                >
                  {kw}
                </div>
              );
            } else {
              return (
                <div
                  key={kw}
                  className={styles["col"]}
                  style={{ backgroundColor: "rgb(230, 230, 230)" }}
                  onClick={() => moveByKeyword(1, index)}
                >
                  {kw}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Keywords;
