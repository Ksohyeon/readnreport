import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MyFriendComp.module.css";
import { IoPerson } from "react-icons/io5";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { call } from "service/ApiService";
import { Channel } from "../MyFriendPage";
import MakeChannelModalComp from "../MakeChannelModalComp/MakeChannelModalComp";

export interface Friend {
  fid: string;
  fnickname: string;
  fuserId: string;
  userID: string;
  chosen?: boolean;
}

interface OwnProps {
  setChannelList: React.Dispatch<React.SetStateAction<Channel[]>>;
}

const MyFriendComp = ({ setChannelList }: OwnProps) => {
  const addFriendInputRef = useRef<HTMLInputElement>(null);
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [isMakeChannelModelOpen, setIsMakeChannelModelOpen] = useState(false);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!addFriendInputRef.current) return;
      call("/friend/add", "POST", {
        fnickname: addFriendInputRef.current.value,
      }).then((response) => {
        setFriendList(response.data);
      });
    },
    []
  );

  const handleMakeChannel = useCallback((friend: Friend) => {
    call("/channel/new", "POST", [friend]).then((response) => {
      console.log(response);
      setChannelList(response);
    });
  }, []);

  const handleMakeChannelModal = useCallback(() => {
    setIsMakeChannelModelOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    call("/friend/all", "GET").then((response) => {
      console.log(response.data);
      setFriendList(response.data);
    });
  }, []);

  return (
    <div className={styles["page"]}>
      {isMakeChannelModelOpen && (
        <div style={{ position: "absolute", zIndex: "2" }}>
          <MakeChannelModalComp
            setChannelList={setChannelList}
            friendList={friendList}
            setIsMakeChannelModelOpen={setIsMakeChannelModelOpen}
          />
        </div>
      )}
      <div className={styles["friend-list"]}>
        <div className={styles["text1"]}>
          <IoPerson size={20} />
          친구목록{`(${friendList.length})`}
          <span
            className={styles["chat-icon"]}
            onClick={handleMakeChannelModal}
          >
            <IoChatbubbleEllipses size={20} />
            &nbsp;
            <FaPlus size={17} />
          </span>
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
      <div className={styles["friend-add"]}>
        <div className={styles["text1"]}>친구 추가</div>
        <form onSubmit={handleSubmit}>
          <input ref={addFriendInputRef} placeholder="닉네임으로 추가" />
          <button type="submit">추가</button>
        </form>
      </div>
    </div>
  );
};

export default MyFriendComp;
