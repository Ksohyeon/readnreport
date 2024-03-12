import { useCallback, useEffect, useState } from "react";
import styles from "./ChatChannelListComp.module.css";
import { call } from "service/ApiService";
import { Channel } from "../MyFriendPage";
import { useNavigate, useSearchParams } from "react-router-dom";

interface OwnProps {
  channelList: Channel[];
  setChannelList: React.Dispatch<React.SetStateAction<Channel[]>>;
}

const ChatChannelListComp = ({ channelList, setChannelList }: OwnProps) => {
  const navigate = useNavigate();
  const handleOpenChannel = useCallback((channelId: number) => {
    navigate("/friends?channel_id=" + channelId);
  }, []);

  useEffect(() => {
    call("/channel/all", "GET").then((response) => {
      console.log(response);
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
              {channel.channelName}
              {channel.choosen && (
                <button
                  className={styles["chat-btn"]}
                  onClick={() => handleOpenChannel(channel.channelId)}
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
