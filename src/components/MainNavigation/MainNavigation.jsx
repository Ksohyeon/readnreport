import styles from "./MainNavigation.module.css";
import { GrMenu } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openSideBar, closeSideBar } from "../../features/sideBar/sideBarSlice";
import { useEffect, useState } from "react";

function MainNavigation() {
  const sideBar = useSelector((state) => state.sideBar.isOpen);
  const dispatch = useDispatch();
  const [navbgcolor, setNavbgcolor] = useState(false);

  const openOrClode = () => {
    if (sideBar) dispatch(closeSideBar());
    else dispatch(openSideBar());
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let scrollY = window.scrollY;
      if (scrollY > (window.innerHeight / 5) * 3) {
        setNavbgcolor(true);
      } else {
        setNavbgcolor(false);
      }
    });
  }, []);

  return (
    <>
      <div className={`${styles.nav} ${navbgcolor ? styles.bgcolor : ""}`}>
        <GrMenu className={styles["grmenu"]} size={40} onClick={openOrClode} />
        <span>
          <Link className={styles["site-name"]} to="/">
            독서와 기록
          </Link>
        </span>
      </div>
    </>
  );
}

export default MainNavigation;
