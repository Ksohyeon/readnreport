import SideBar from "../SideBar/SideBar";
import styles from "./MainNavigation.module.css";
import { GrMenu } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openSideBar, closeSideBar } from "../../features/sideBar/sideBarSlice";

function MainNavigation() {
  const sideBar = useSelector((state) => state.sideBar.isOpen);
  const dispatch = useDispatch();

  const openOrClode = () => {
    if (sideBar) dispatch(closeSideBar());
    else dispatch(openSideBar());
  };

  return (
    <>
      <div className={styles["nav"]}>
        <GrMenu className={styles["grmenu"]} size={40} onClick={openOrClode} />
        <span>
          <Link className={styles["site-name"]} to="/">
            독서와 기록
          </Link>
        </span>
        <div
          className={styles["sidebar"]}
          style={{
            transform: sideBar ? "translateX(0)" : "translateX(-100%)",
            transition: "0.7s",
          }}
        >
          <SideBar />
        </div>
      </div>
    </>
  );
}

export default MainNavigation;
