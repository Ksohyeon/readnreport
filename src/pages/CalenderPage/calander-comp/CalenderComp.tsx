import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./CalenderComp.module.css";
import { Book } from "pages/MyReportPage/myreportpage-comps/MyBooks/MyBooksComp";

interface CalenderDate {
  date: number;
  day: number;
  content: (Book & { startOrEnd: boolean })[];
  isThisMonth: boolean;
}
interface CalenderMonth {
  year: number;
  month: number;
  dateList: CalenderDate[];
}

interface OwnProps {
  currentYear: number;
  currentMonth: number;
  books: Book[];
}

const CalenderComp = ({ currentYear, currentMonth, books }: OwnProps) => {
  const makeCurMonthPage = useCallback((year: number, month: number) => {
    // 이번달 1일의 요일
    let dayOfFirstDateofThisMonth = new Date(year, month, 1).getDay();
    if (dayOfFirstDateofThisMonth < 0)
      dayOfFirstDateofThisMonth = 7 - dayOfFirstDateofThisMonth;
    // 이번달 마지막 일,요일
    const lastDateOfThisMonthObj = new Date(year, month + 1, 0);
    const lastDateOfThisMonth = lastDateOfThisMonthObj.getDate();
    const lastDayOfThisMonth = lastDateOfThisMonthObj.getDay();
    // 배열에 이번달 날들 넣기
    let day = dayOfFirstDateofThisMonth;
    const list: CalenderDate[] = [];
    for (let i = 1; i <= lastDateOfThisMonth; i++) {
      list.push({
        date: i,
        day: day,
        content: [],
        isThisMonth: true,
      });
      day++;
      if (day > 6) day = day - 7;
    }
    // 배열 앞, 뒤에 남는 날 채우기
    const prevMonthYear = month !== 0 ? year : year - 1;
    const prevMonth = month !== 0 ? month - 1 : 11;
    let prevDate = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
    for (let i = dayOfFirstDateofThisMonth - 1; i >= 0; i--) {
      list.unshift({
        date: prevDate--,
        day: i,
        content: [],
        isThisMonth: false,
      });
    }
    const nextMonthDatesCnt =
      list.length <= 35 ? 13 - lastDayOfThisMonth : 6 - lastDayOfThisMonth;

    for (
      let i = lastDayOfThisMonth + 1, j = 1;
      j <= nextMonthDatesCnt;
      i < 6 ? i++ : 0, j++
    ) {
      list.push({
        date: j,
        day: i,
        content: [],
        isThisMonth: false,
      });
    }

    return list;
  }, []);

  const [currentPage, setCurrentPage] = useState<CalenderMonth>({
    year: 0,
    month: 0,
    dateList: [],
  });

  const defaultDateList = useMemo<CalenderDate[]>(() => {
    return makeCurMonthPage(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  useEffect(() => {
    setCurrentPage({
      year: currentYear,
      month: currentMonth,
      dateList: defaultDateList,
    });
  }, [currentYear, currentMonth]);

  useEffect(() => {
    if (currentPage.month) {
      const lastMonthDays =
        new Date(currentYear, currentMonth, 0).getDate() -
        currentPage.dateList[0].date;
      const dateList = JSON.parse(JSON.stringify(defaultDateList));
      for (let book of books) {
        if (!book.startDate) continue;

        const startDateY = parseInt(book.startDate.substring(0, 4));
        const startDateD = parseInt(book.startDate.substring(8, 10));
        if (startDateY == currentYear) {
          dateList[startDateD + lastMonthDays].content.push({
            ...book,
            startOrEnd: true,
          });
        }

        if (!book.endDate) continue;
        const endDateY = parseInt(book.endDate.substring(0, 4));
        const endDateD = parseInt(book.endDate.substring(8, 10));
        if (endDateY == currentYear) {
          dateList[endDateD + lastMonthDays].content.push({
            ...book,
            startOrEnd: false,
          });
        }
      }
      setCurrentPage((prev) => ({ ...prev, dateList: dateList }));
    }
  }, [books]);

  return (
    <div className={styles.calender}>
      <ul className={styles["day-list"]}>
        <li>sun</li>
        <li>mon</li>
        <li>tue</li>
        <li>wed</li>
        <li>thu</li>
        <li>fri</li>
        <li>sat</li>
      </ul>
      <div className={styles.container}>
        {currentPage.dateList.map((page) => (
          <div className={styles.element}>
            <div
              className={`${styles.content} ${
                page.isThisMonth ? styles.thismonth : ""
              }`}
            >
              <div className={styles["date"]}>{page.date}</div>
              <div>
                {page.content.map((book) => (
                  <div
                    className={`${
                      book.startOrEnd ? styles["start"] : styles["end"]
                    }`}
                  >
                    {book.bookTitle}
                  </div>
                ))}
              </div>
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalenderComp;
