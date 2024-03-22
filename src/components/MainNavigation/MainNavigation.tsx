import React from "react";

import styles from "./MainNavigation.module.css";
import { GrMenu } from "react-icons/gr";
import logo from "img/logo.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openSideBar, closeSideBar } from "../../features/sideBar/sideBarSlice";
import { useEffect, useState } from "react";
import { SidebarState } from "../../pages/Root/Root";

const MainNavigation: React.FC = () => {
  const sideBar = useSelector((state: SidebarState) => state.sideBar.isOpen);
  const dispatch = useDispatch();
  const [navbgcolor, setNavbgcolor] = useState(false);

  const openOrClode = () => {
    if (sideBar) dispatch(closeSideBar());
    else dispatch(openSideBar());
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let scrollY = window.scrollY;
      if (scrollY > (window.innerHeight / 3) * 2) {
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
        <Link className={styles["site-name"]} to="/">
          <img src={logo} />
        </Link>
      </div>
    </>
  );
};

export default MainNavigation;
