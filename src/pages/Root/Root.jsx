import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";
import MainNavigation from "../../components/MainNavigation/MainNavigation";

function RootLayout() {
  return (
    <>
      <div className={styles["main-nav"]}>
        <MainNavigation />
      </div>
      <main className={styles["main"]}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
