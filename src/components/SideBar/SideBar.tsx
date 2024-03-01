import { Link } from "react-router-dom";
import { signout } from "../../service/ApiService";
import { useSelector } from "react-redux";
import React from "react";
import styles from "./SideBar.module.css";

interface LoginCheck {
  isLoggedIn: boolean;
}

interface AuthState {
  auth: LoginCheck;
}

const SideBar: React.FC = () => {
  const isLoggedIn = useSelector((state: AuthState) => state.auth.isLoggedIn);

  return (
    <div className={styles.sidebar}>
      {!isLoggedIn && (
        <div>
          <div className={styles.mot}>
            <span>내가 세계를 알게 된 것은</span>
            <br />
            <span>책에 의해서였다.</span>
            <br />
            <span>- 사르트르</span>
          </div>
          <div className={styles["btn1"]}>
            <Link className={styles["text-link"]} to="/login">
              로그인
            </Link>
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <div className={styles["profile-img"]}></div>
          <div className={styles["user-name"]}>김유저</div>
          <div className={styles["buttons"]}>
            <div className={styles["btn"]}>
              <Link className={styles["text-link"]} to="/bookshelf">
                나의 기록
              </Link>
            </div>
            <div className={styles["btn"]}>
              <Link className={styles["text-link"]} to="/calendar">
                독서 달력
              </Link>
            </div>
            <div className={styles["btn"]}>프로필 변경</div>
            <div className={styles["btn"]}>나의 독서친구</div>
            <div className={`${styles.btn} ${styles.logout}`} onClick={signout}>
              로그아웃
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
