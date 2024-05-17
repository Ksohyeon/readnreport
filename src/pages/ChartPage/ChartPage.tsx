import { useEffect, useMemo, useRef, useState } from "react";
import { call } from "service/ApiService";
import styles from "./ChartPage.module.css";
import { Book } from "pages/MyReportPage/myreportpage-comps/MyBooks/MyBooksComp";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

function ChartPage() {
  const date = useRef<Date>(new Date());
  const [currentYear, setCurrentYear] = useState(date.current.getFullYear());
  const [chart, setChart] = useState<Book[][]>([]);

  useEffect(() => {
    call(`/mybook/chart?year=${currentYear}`, "GET").then((response) => {
      setChart(() => {
        const chartList: Book[][] = new Array(12).fill([]);
        chartList.forEach((val, i) => {
          chartList[i] = [];
        });
        response.data.forEach((book: Book) => {
          const year = parseInt(book.endDate.substring(5, 7));
          if (chartList[year] === undefined) {
            chartList[year] = [book];
          } else chartList[year].push(book);
        });
        console.log("chart: ", chartList);
        return chartList;
      });
    });
  }, [currentYear, setChart]);

  return (
    <div className={styles.page}>
      <div className={styles.year}>
        <BiSolidLeftArrow
          size={20}
          onClick={() => setCurrentYear((prev) => prev - 1)}
        />
        <span>{currentYear}</span>
        <BiSolidRightArrow
          size={20}
          onClick={() => setCurrentYear((prev) => prev + 1)}
        />
      </div>
      <div className={styles.chart}>
        <div className={styles.chartGrid}>
          {chart.map((books, idx) => {
            return (
              <div
                className={styles.chartbarMonth}
                key={currentYear + "" + (idx + 1)}
              >
                {books.length > 0 && (
                  <div className={styles.bookcnt}>{books.length}</div>
                )}
                <div
                  className={styles.chartbar}
                  style={{
                    height: `${books.length * 10}px`,
                  }}
                >
                  <div className={styles.growbar}></div>
                </div>
                <div className={styles.month}>{idx + 1}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ChartPage;
