import { useState } from "react";

import styles from "./MyFriendPage.module.css";
import MyFriendComp from "./MyFriendComp/MyFriendComp";
import ChatChannelListComp from "./ChatChannelListComp/ChatChannelListComp";
import ChatSpaceComp from "./ChatSpaceComp/ChatSpaceComp";

export interface Channel {
  channelId: number;
  channelName: string;
  userId: string;
  choosen?: boolean;
}

const MyFriendPage: React.FC = () => {
  const [channelList, setChannelList] = useState<Channel[]>([]);

  return (
    <div className={styles["page"]}>
      <MyFriendComp setChannelList={setChannelList} />
      <ChatChannelListComp
        channelList={channelList}
        setChannelList={setChannelList}
      />
      <ChatSpaceComp />
    </div>
  );
};

export default MyFriendPage;
