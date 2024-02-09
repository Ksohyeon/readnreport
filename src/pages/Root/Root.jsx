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

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.getElementById("main").addEventListener("click", () => {
      if (sideBar) dispatch(closeSideBar());
    });

    window.addEventListener("scroll", () => {
      // 스크롤 위치가 100px 이상일 때 위로 가기 버튼을 보이게 함
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 20
      ) {
        document.getElementById("btn-back-to-top").style.display = "block";
      } else {
        document.getElementById("btn-back-to-top").style.display = "none";
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
      <main id="main" className={styles["main"]}>
        <Outlet />
      </main>
      <button
        id="btn-back-to-top"
        className={styles["btn-back-to-top"]}
        onClick={backToTop}
        title="위로 가기"
      >
        Top
      </button>
    </>
  );
}

export default RootLayout;
