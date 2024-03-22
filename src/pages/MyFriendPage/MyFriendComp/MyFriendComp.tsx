import { useCallback, useEffect, useState } from "react";
import styles from "./MyFriendComp.module.css";
import { IoPerson } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { call } from "service/ApiService";
import { Channel, Friend, PageType } from "../MyFriendPage";
import MakeFriendModalComp from "../MakeFriendModalComp/MakeFriendModalComp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "components/SideBar/SideBar";

interface OwnProps {
  friendList: Friend[];
  setCurComp: React.Dispatch<React.SetStateAction<PageType>>;
  setFriendList: React.Dispatch<React.SetStateAction<Friend[]>>;
  setCurrentChannel: React.Dispatch<React.SetStateAction<Channel>>;
}

const MyFriendComp = ({
  setCurComp,
  friendList,
  setFriendList,
  setCurrentChannel,
}: OwnProps) => {
  const [isMakeFriendModalOpen, setIsMakeFriendModalOpen] = useState(false);
  const myNickName = useSelector((state: AuthState) => state.auth.nickname);
  const navigate = useNavigate();

  const handleMakeChannel = useCallback((friend: Friend) => {
    call("/channel/new", "POST", [friend]).then((response) => {
      const channel = response[0];
      console.log(channel);
      setCurrentChannel({
        channelId: channel.channelId,
        userId: friend.userID,
        members: [
          { channelId: channel.channelId, nickname: myNickName, userId: "" },
          {
            channelId: channel.channelId,
            nickname: friend.fnickname,
            userId: friend.fid,
          },
        ],
      });

      navigate(`/friends?channel_id=${channel.channelId}`);
      setCurComp("chat-list");
    });
  }, []);

  const handleMakeFriendModal = useCallback(() => {
    setIsMakeFriendModalOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    call("/friend/all", "GET").then((response) => {
      console.log(response.data);
      setFriendList(response.data);
    });
  }, []);

  return (
    <div className={styles["page"]}>
      {isMakeFriendModalOpen && (
        <div style={{ position: "absolute", zIndex: "1" }}>
          <MakeFriendModalComp
            setFriendList={setFriendList}
            setIsMakeFriendModalOpen={setIsMakeFriendModalOpen}
          />
        </div>
      )}
      <div className={styles["friend-list"]}>
        <div className={styles["text1"]}>
          <IoPerson size={20} />
          친구목록{`(${friendList.length})`}
        </div>
        {friendList.map((friend, idx) => {
          return (
            <div
              key={idx}
              className={styles["friend"]}
              onMouseEnter={() => {
                setFriendList((prev: Friend[]) => {
                  const list = [...prev];
                  list[idx].chosen = true;
                  return list;
                });
              }}
              onMouseLeave={() => {
                setFriendList((prev: Friend[]) => {
                  const list = [...prev];
                  list[idx].chosen = false;
                  return list;
                });
              }}
            >
              {friend.fnickname}
              {friend.chosen && (
                <button
                  className={styles["chat-btn"]}
                  onClick={() => handleMakeChannel(friend)}
                >
                  1:1 채팅
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles["buttons"]}>
        <div className={styles["icon"]} onClick={handleMakeFriendModal}>
          <span>
            <IoPerson size={24} />
          </span>
          &nbsp;
          <span>
            <FaPlus size={12} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyFriendComp;
