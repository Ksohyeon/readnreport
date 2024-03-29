import styles from "./Root.module.css";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SidebarState } from "./Root";
import { closeSideBar } from "../../features/sideBar/sideBarSlice";
import SideBar from "../../components/SideBar/SideBar";
import MainNavigation from "../../components/MainNavigation/MainNavigation";

export const RootLayout: React.FC = () => {
  const sideBar = useSelector((state: SidebarState) => state.sideBar.isOpen);
  const dispatch = useDispatch();
  const [backToTopBtn, setBackToTopBtn] = useState(false);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mainClickHandler = () => {
    if (sideBar) dispatch(closeSideBar());
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 20
      ) {
        setBackToTopBtn(true);
      } else {
        setBackToTopBtn(false);
      }
    });
  });

  return (
    <>
      <div className={styles["main-nav"]}>
        <MainNavigation />
      </div>
      <div
        className={styles["sidebar"]}
        style={{
          transform: sideBar ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <SideBar />
      </div>
      <main className={styles["main"]} onClick={mainClickHandler}>
        <Outlet />
      </main>
      <button
        className={`${styles.btnBackToTop} ${
          backToTopBtn ? "" : styles.btnDisplay
        }`}
        onClick={backToTop}
        title="위로 가기"
      >
        Top
      </button>
    </>
  );
};

export default RootLayout;
