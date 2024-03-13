import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as StompJs from "@stomp/stompjs";
import styles from "./ChatSpaceComp.module.css";
import { Channel } from "../MyFriendPage";
import { current } from "@reduxjs/toolkit";
import { call } from "service/ApiService";

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
}

const ChatSpaceComp = ({ currentChannel }: OwnProps) => {
  const myNickname = useSelector((state: AuthState) => state.auth.nickname);
  const client = useRef<StompJs.Client | null>(null);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [chat, setChat] = useState("");
  const [searchParams] = useSearchParams();
  const channelId = useMemo(() => {
    return searchParams.get("channel_id");
  }, [searchParams]);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8080/ws",
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
      call(`/channel/chat?channel=${channelId}`, "GET").then((response) => {
        console.log("채팅내역:");
        setChatList(response);
      });
    }

    connect();
  }, [channelId]);

  return (
    <div className={styles["comp"]}>
      <div className={styles["chat-space"]}>
        <div className={styles["text1"]}>
          {currentChannel.members.length === 0 ? (
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
        {/* <div>채널: {channelId}</div> */}
        {chatList &&
          chatList.map((chat) => (
            <div
              className={styles[`${chat.writer === myNickname ? "me" : ""}`]}
            >
              {chat.writer}: {chat.chat}
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
              type={"text"}
              name={"chatInput"}
              onChange={handleChange}
              value={chat}
              className={styles["chat-input"]}
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
