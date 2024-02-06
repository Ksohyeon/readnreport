import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";
import MainNavigation from "../../components/MainNavigation/MainNavigation";
import SideBar from "../../components/SideBar/SideBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSideBar } from "../../features/sideBar/sideBarSlice";

function RootLayout() {
  const sideBar = useSelector((state) => state.sideBar.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById("main").addEventListener("click", () => {
      if (sideBar) dispatch(closeSideBar());
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
      <main id="main" className={styles["main"]}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
