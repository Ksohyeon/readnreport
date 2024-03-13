import { useState } from "react";

import styles from "./MyFriendPage.module.css";
import MyFriendComp from "./MyFriendComp/MyFriendComp";
import ChatChannelListComp from "./ChatChannelListComp/ChatChannelListComp";
import ChatSpaceComp from "./ChatSpaceComp/ChatSpaceComp";

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

const MyFriendPage: React.FC = () => {
  const [currentChannel, setCurrentChannel] = useState<Channel>({
    channelId: -1,
    userId: "",
    members: [],
  });
  const [channelList, setChannelList] = useState<Channel[]>([]);

  return (
    <div className={styles["page"]}>
      <MyFriendComp setChannelList={setChannelList} />
      <ChatChannelListComp
        channelList={channelList}
        setChannelList={setChannelList}
        setCurrentChannel={setCurrentChannel}
      />
      <ChatSpaceComp currentChannel={currentChannel} />
    </div>
  );
};

export default MyFriendPage;
