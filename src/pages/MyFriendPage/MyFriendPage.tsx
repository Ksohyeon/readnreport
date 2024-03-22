import { useState } from "react";

import styles from "./MyFriendPage.module.css";
import MyFriendComp from "./MyFriendComp/MyFriendComp";
import ChatChannelListComp from "./ChatChannelListComp/ChatChannelListComp";
import FriendPageSideBar from "./FriendPageSideBar/FriendPageSideBar";

interface Member {
  channelId: number;
  userId: string;
  nickname: string;
}
export interface Channel {
  channelId: number;
  userId: string;
  members: Member[];
  choosen?: boolean;
}

export interface Friend {
  fid: string;
  fnickname: string;
  fuserId: string;
  userID: string;
  chosen?: boolean;
}
export type PageType = "friend-list" | "chat-list";

const MyFriendPage: React.FC = () => {
  const [curComp, setCurComp] = useState<PageType>("friend-list");
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [channelList, setChannelList] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<Channel>({
    channelId: -1,
    userId: "",
    members: [],
  });

  return (
    <div className={styles["page"]}>
      <div className={styles["slide-bar"]}>
        <FriendPageSideBar curComp={curComp} setCurComp={setCurComp} />
      </div>
      {curComp === "friend-list" && (
        <MyFriendComp
          friendList={friendList}
          setCurComp={setCurComp}
          setFriendList={setFriendList}
          setCurrentChannel={setCurrentChannel}
        />
      )}
      {curComp === "chat-list" && (
        <>
          <ChatChannelListComp
            friendList={friendList}
            currentChannel={currentChannel}
            channelList={channelList}
            setChannelList={setChannelList}
            setCurrentChannel={setCurrentChannel}
          />
        </>
      )}
    </div>
  );
};

export default MyFriendPage;
