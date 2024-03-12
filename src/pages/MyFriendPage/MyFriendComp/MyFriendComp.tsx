import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MyFriendComp.module.css";
import { IoPerson } from "react-icons/io5";
import { call } from "service/ApiService";
import { Channel } from "../MyFriendPage";

interface Friend {
  fid: string;
  fnickname: string;
  fuserId: string;
  userID: string;
  choosen?: boolean;
}

interface OwnProps {
  setChannelList: React.Dispatch<React.SetStateAction<Channel[]>>;
}

const MyFriendComp = ({ setChannelList }: OwnProps) => {
  const addFriendInputRef = useRef<HTMLInputElement>(null);
  const [friendList, setFriendList] = useState<Friend[]>([]);

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

  useEffect(() => {
    call("/friend/all", "GET").then((response) => {
      console.log(response.data);
      setFriendList(response.data);
    });
  }, []);

  return (
    <div className={styles["page"]}>
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
                  list[idx].choosen = true;
                  return list;
                });
              }}
              onMouseLeave={() => {
                setFriendList((prev: Friend[]) => {
                  const list = [...prev];
                  list[idx].choosen = false;
                  return list;
                });
              }}
            >
              {friend.fnickname}
              {friend.choosen && (
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
