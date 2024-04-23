import { Link } from "react-router-dom";
import { signout } from "../../service/ApiService";
import { useSelector } from "react-redux";
import React from "react";
import styles from "./SideBar.module.css";
import { FaPencilAlt } from "react-icons/fa";
import ButtonComp from "components/ButtonComp/ButtonComp";

export interface LoginCheck {
  isLoggedIn: boolean;
  nickname: string;
}

export interface AuthState {
  auth: LoginCheck;
}

const SideBar: React.FC = () => {
  const isLoggedIn = useSelector((state: AuthState) => state.auth.isLoggedIn);
  const nickname = useSelector((state: AuthState) => state.auth.nickname);

  return (
    <div className={styles.sidebar}>
      {!isLoggedIn && (
        <div>
          <div className={styles["buttons"]}>
            <div className={styles["btn"]} style={{ marginTop: "10vh" }}>
              <Link className={styles["text-link"]} to="/login">
                <ButtonComp content={"로그인"} />
              </Link>
            </div>
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <div className={styles["profile-img"]}></div>
          <div className={styles["user-name"]}>
            {nickname}&nbsp;
            <span>
              <Link className={styles["text-link"]} to={"/user-info"}>
                <FaPencilAlt />
              </Link>
            </span>
          </div>
          <div className={styles["buttons"]}>
            <div className={styles["btn"]}>
              <Link className={styles["text-link"]} to="/bookshelf">
                <ButtonComp content={"책장으로"} />
              </Link>
            </div>
            <div className={styles["btn"]}>
              <Link className={styles["text-link"]} to="/calendar">
                <ButtonComp content={"독서달력"} />
              </Link>
            </div>
            <div className={styles["btn"]}>
              <Link className={styles["text-link"]} to={"/friends"}>
                <ButtonComp content={"독서친구"} />
              </Link>
            </div>
            <div className={`${styles.btn} ${styles.logout}`} onClick={signout}>
              <ButtonComp content="로그아웃" />
            </div>
            {/* <ButtonComp content={} /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
