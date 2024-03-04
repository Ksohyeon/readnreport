import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./CalendarPage.module.css";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

interface CalenderDate {
  date: number;
  day: number;
  content: string[];
  isThisMonth: boolean;
}
interface CalenderMonth {
  year: number;
  month: number;
  dateList: CalenderDate[];
}

const CalendarPage: React.FC = () => {
  const today = useRef<Date>(new Date());
  const [currentYear, setCurrentYear] = useState(today.current.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.current.getMonth());

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
    console.log("nextMonthDatesCnt ", nextMonthDatesCnt);
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

  useEffect(() => {
    setCurrentPage({
      year: currentYear,
      month: currentMonth,
      dateList: makeCurMonthPage(currentYear, currentMonth),
    });
    // 독서 일정 데이터 가져오는 부분
  }, [currentYear, currentMonth]);

  // 테스트용
  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  const prevMonthHandler = () => {
    if (currentMonth == 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else setCurrentMonth((prev) => prev - 1);
  };

  const nextMonthHandler = () => {
    if (currentMonth == 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else setCurrentMonth((prev) => prev + 1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.btngroup}>
        <button onClick={prevMonthHandler}>
          <BiSolidLeftArrow size={20} />
        </button>
        <span>{currentYear} 년</span> &nbsp;&nbsp;
        <span>{currentMonth + 1} 월</span>
        <button onClick={nextMonthHandler}>
          <BiSolidRightArrow size={20} />
        </button>
      </div>
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
                {page.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
