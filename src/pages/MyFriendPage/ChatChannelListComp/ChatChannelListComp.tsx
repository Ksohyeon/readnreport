import { useCallback, useEffect, useMemo } from "react";
import styles from "./ChatChannelListComp.module.css";
import { call } from "service/ApiService";
import { Channel } from "../MyFriendPage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "../ChatSpaceComp/ChatSpaceComp";

interface OwnProps {
  channelList: Channel[];
  setChannelList: React.Dispatch<React.SetStateAction<Channel[]>>;
  setCurrentChannel: React.Dispatch<React.SetStateAction<Channel>>;
}

const ChatChannelListComp = ({
  channelList,
  setChannelList,
  setCurrentChannel,
}: OwnProps) => {
  const myNickname = useSelector((state: AuthState) => state.auth.nickname);
  const navigate = useNavigate();
  const handleOpenChannel = useCallback((channel: Channel) => {
    setCurrentChannel(channel);
    navigate("/friends?channel_id=" + channel.channelId);
  }, []);

  const channelNameList = useMemo(() => {
    if (channelList.length === 0) return [];
    const list = channelList.map((channel) => {
      if (channel.members.length === 2) {
        if (channel.members[0].nickname === myNickname)
          return channel.members[1].nickname;
        return channel.members[0].nickname;
      } else if (channel.members.length > 2) {
        if (channel.members[0].nickname === myNickname)
          return (
            channel.members[1].nickname +
            " 외" +
            (channel.members.length - 1) +
            "명"
          );
        return (
          channel.members[0].nickname +
          " 외" +
          (channel.members.length - 2) +
          "명"
        );
      }
    });
    return list;
  }, [channelList]);

  useEffect(() => {
    call("/channel/all", "GET").then((response) => {
      setChannelList(response);
    });
  }, []);

  return (
    <div className={styles["comp"]}>
      <div className={styles["channel-list"]}>
        <div className={styles["text1"]}>채팅 목록</div>
        {channelList.map((channel, idx) => {
          return (
            <div
              className={styles["channel"]}
              key={channel.channelId}
              onMouseEnter={() => {
                setChannelList((prev: Channel[]) => {
                  const list = [...prev];
                  list[idx].choosen = true;
                  return list;
                });
              }}
              onMouseLeave={() => {
                setChannelList((prev: Channel[]) => {
                  const list = [...prev];
                  list[idx].choosen = false;
                  return list;
                });
              }}
            >
              {channelNameList[idx]}
              {channel.choosen && (
                <button
                  className={styles["chat-btn"]}
                  onClick={() => handleOpenChannel(channel)}
                >
                  채팅하기
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatChannelListComp;
