import * as StompJs from "@stomp/stompjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./ChatSpaceComp.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { call } from "service/ApiService";
import { Channel } from "../MyFriendPage";

interface Chat {
  channalId: number;
  writer: string;
  chat: string;
}

export interface AuthState {
  auth: { nickname: string };
}

interface OwnProps {
  currentChannel: Channel;
  setIsChatSpaceOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatSpaceComp = ({ currentChannel, setIsChatSpaceOpen }: OwnProps) => {
  const myNickname = useSelector((state: AuthState) => state.auth.nickname);
  const client = useRef<StompJs.Client | null>(null);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [searchParams] = useSearchParams();
  const [chat, setChat] = useState("");

  const channelId = useMemo(() => {
    return searchParams.get("channel_id");
  }, [searchParams]);

  const handleClose = useCallback(() => {
    setIsChatSpaceOpen(false);
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://api.lettlebookshelf.org:8080/ws",
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("success");
        subscribe();
      },
      connectHeaders: {
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      },
    });
    client.current.activate();
  };

  const publish = (chat: string) => {
    if (client.current == null) return;
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/pub/chat",
      body: JSON.stringify({
        channelId: channelId,
        writer: myNickname,
        chat: chat,
      }),
    });

    setChat("");
  };

  const subscribe = () => {
    if (client.current == null) return;
    client.current.subscribe("/sub/chat/" + channelId, (body) => {
      const json_body = JSON.parse(body.body);
      console.log("json_body: ", json_body);
      console.log("chatlist: ", chatList);
      setChatList((list) => [...list, json_body]);
    });
  };

  const disconnect = () => {
    if (client.current == null) return;
    client.current.deactivate();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChat(event.target.value);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    chat: string
  ) => {
    event.preventDefault();

    publish(chat);
  };

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  useEffect(() => {
    disconnect();

    if (channelId) {
      // 채팅 내역 불러오기
      call(`/channel/chat?channel=${channelId}`, "GET").then(
        (response: Chat[]) => {
          console.log("채팅내역:", response);
          setChatList(response ? response : []);
        }
      );
    }

    connect();
  }, [channelId]);

  return (
    <div className={styles["comp"]}>
      <div className={styles["chat-space"]}>
        <div className={styles["text1"]}>
          {currentChannel.channelId === -1 ? (
            <div>채팅방</div>
          ) : currentChannel.members.length === 2 ? (
            <div>
              {currentChannel.members[0].nickname === myNickname
                ? currentChannel.members[1].nickname
                : currentChannel.members[0].nickname}
            </div>
          ) : (
            <div>
              {currentChannel.members[0].nickname === myNickname
                ? currentChannel.members[1].nickname
                : currentChannel.members[0].nickname}
              외 {currentChannel.members.length - 2}명
            </div>
          )}
        </div>
        <span className={styles["close-btn"]} onClick={handleClose}>
          <IoIosCloseCircleOutline size={30} />
        </span>
        {/* <div>채널: {channelId}</div> */}
        {chatList &&
          chatList.map((chat) => (
            <div
              className={`${styles[chat.writer === myNickname ? "me" : ""]} ${
                styles.chat
              }`}
            >
              <span>
                {chat.writer === myNickname ? "" : chat.writer + " :"}
              </span>{" "}
              {chat.chat}
            </div>
          ))}
        {channelId && (
          <form
            className={styles["chat-form"]}
            onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
              handleSubmit(event, chat)
            }
          >
            <input
              className={styles["chat-input"]}
              value={chat}
              type={"text"}
              name={"chatInput"}
              onChange={handleChange}
            />
            <button type={"submit"} className={styles["chat-btn"]}>
              전송
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatSpaceComp;
