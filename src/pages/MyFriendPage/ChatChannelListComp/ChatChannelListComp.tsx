import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./ChatChannelListComp.module.css";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { call } from "service/ApiService";
import { Channel, Friend } from "../MyFriendPage";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatSpaceComp, { AuthState } from "../ChatSpaceComp/ChatSpaceComp";
import MakeChannelModalComp from "../MakeChannelModalComp/MakeChannelModalComp";

interface OwnProps {
  friendList: Friend[];
  currentChannel: Channel;
  channelList: Channel[];
  setChannelList: React.Dispatch<React.SetStateAction<Channel[]>>;
  setCurrentChannel: React.Dispatch<React.SetStateAction<Channel>>;
}

const ChatChannelListComp = ({
  friendList,
  currentChannel,
  channelList,
  setChannelList,
  setCurrentChannel,
}: OwnProps) => {
  const myNickname = useSelector((state: AuthState) => state.auth.nickname);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleOpenChannel = useCallback((channel: Channel) => {
    setCurrentChannel(channel);
    setIsChatSpaceOpen(true);
    navigate("/friends?channel_id=" + channel.channelId);
  }, []);

  const [isChatSpaceOpen, setIsChatSpaceOpen] = useState(false);
  const [isMakeChannelModelOpen, setIsMakeChannelModelOpen] = useState(false);
  const handleMakeChannelModal = useCallback(() => {
    setIsMakeChannelModelOpen((prev) => !prev);
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
    const searchParam = searchParams.get("channel_id");
    if (searchParam) {
      setIsChatSpaceOpen(true);
    }
  }, []);

  return (
    <>
      <div className={styles["comp"]}>
        {isMakeChannelModelOpen && (
          <div style={{ position: "absolute", zIndex: "2" }}>
            <MakeChannelModalComp
              setChannelList={setChannelList}
              friendList={friendList}
              setIsMakeChannelModelOpen={setIsMakeChannelModelOpen}
            />
          </div>
        )}
        {currentChannel.channelId !== -1 && isChatSpaceOpen && (
          <div style={{ position: "absolute", zIndex: "2" }}>
            <ChatSpaceComp
              currentChannel={currentChannel}
              setIsChatSpaceOpen={setIsChatSpaceOpen}
            />
          </div>
        )}
        <div className={styles["channel-list"]}>
          <div className={styles["buttons"]}>
            <div className={styles["icon"]} onClick={handleMakeChannelModal}>
              <span>
                <IoChatbubbleEllipses size={24} />
              </span>
              &nbsp;
              <span>
                <FaPlus size={12} />
              </span>
            </div>
          </div>
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
    </>
  );
};

export default ChatChannelListComp;
