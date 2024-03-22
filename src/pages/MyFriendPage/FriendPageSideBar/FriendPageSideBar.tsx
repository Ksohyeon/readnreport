import styles from "./FriendPageSideBar.module.css";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import React, { SetStateAction } from "react";
import { PageType } from "../MyFriendPage";
import { useNavigate } from "react-router-dom";

interface OwnProps {
  curComp: string;
  setCurComp: React.Dispatch<SetStateAction<PageType>>;
}

const iconSize = window.innerWidth <= 600 ? 30 : 36;

const FriendPageSideBar = ({ curComp, setCurComp }: OwnProps) => {
  const navigate = useNavigate();

  const handleOpenFriendList = () => {
    navigate("/friends");
    setCurComp("friend-list");
  };
  const handleOpenChatList = () => {
    setCurComp("chat-list");
  };
  return (
    <div className={styles["side-bar"]}>
      <div className={styles.button} onClick={handleOpenFriendList}>
        <div
          className={`${styles.icon} ${
            curComp === "friend-list" ? styles.selected : ""
          }`}
        >
          <IoPersonSharp size={iconSize} />
        </div>
        <span className={styles["shadow"]}></span>
      </div>
      <div className={styles.button} onClick={handleOpenChatList}>
        <div
          className={`${styles.icon} ${
            curComp === "chat-list" ? styles.selected : ""
          }`}
        >
          <IoIosChatbubbles size={iconSize} />
        </div>
        <span className={styles["shadow"]}></span>
      </div>
    </div>
  );
};

export default FriendPageSideBar;
