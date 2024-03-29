import { useEffect, useRef, useState } from "react";
import styles from "./CalendarPage.module.css";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import CalenderComp from "./calander-comp/CalenderComp";
import { call } from "service/ApiService";
import { Book } from "pages/MyReportPage/myreportpage-comps/MyBooks/MyBooksComp";
import { useDispatch } from "react-redux";
import { useFBO } from "@react-three/drei";
import { closeSideBar } from "features/sideBar/sideBarSlice";

const CalendarPage: React.FC = () => {
  const dispatch = useDispatch();
  const today = useRef<Date>(new Date());
  const [currentYear, setCurrentYear] = useState(today.current.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.current.getMonth());
  const [books, setBooks] = useState<Book[]>([]);

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

  useEffect(() => {
    dispatch(closeSideBar());
  }, []);

  useEffect(() => {
    call(
      `/mybook/cld?year=${currentYear}&month=${currentMonth + 1}`,
      "GET"
    ).then((response) => {
      console.log("mybooks : ", response.data);
      setBooks(response.data);
    });
  }, [currentYear, currentMonth]);

  return (
    <div className={styles.page}>
      <div className={styles.btngroup}>
        <button onClick={prevMonthHandler}>
          <BiSolidLeftArrow size={20} color="#3f2718" />
        </button>
        <span>{currentYear} 년</span> &nbsp;&nbsp;
        <span>{currentMonth + 1} 월</span>
        <button onClick={nextMonthHandler}>
          <BiSolidRightArrow size={20} color="#3f2718" />
        </button>
      </div>
      <div className={styles["marks"]}>
        <div className={styles["blue"]}>시작일</div>
        <div className={styles["yellow"]}>종료일</div>
      </div>
      <CalenderComp
        currentYear={currentYear}
        currentMonth={currentMonth}
        books={books}
      />
    </div>
  );
};

export default CalendarPage;
