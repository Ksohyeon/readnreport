import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";
import MainNavigation from "../../components/MainNavigation/MainNavigation";
import SideBar from "../../components/SideBar/SideBar";
import { useSelector } from "react-redux";

function RootLayout() {
  const sideBar = useSelector((state) => state.sideBar.isOpen);

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
      <main className={styles["main"]}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
