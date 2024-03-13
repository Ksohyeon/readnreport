import React, { useCallback, useEffect, useState } from "react";
import { Friend } from "../MyFriendComp/MyFriendComp";
import styles from "./MakeChannelModalComp.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { Dictionary } from "lodash";
import { call } from "service/ApiService";
import { Channel } from "../MyFriendPage";

interface OwnProps {
  friendList: Friend[];
  setChannelList: React.Dispatch<React.SetStateAction<Channel[]>>;
  setIsMakeChannelModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MakeChannelModalComp = ({
  friendList,
  setChannelList,
  setIsMakeChannelModelOpen,
}: OwnProps) => {
  const [chosenDict, setChosenDict] = useState<Dictionary<Friend>>({});

  const handleCreateChannel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      console.log(chosenDict);
      const members = Object.values(chosenDict).map((member) => {
        const copy = { ...member };
        console.log("chosen: ", copy["chosen"]);
        delete copy["chosen"];
        return copy;
      });
      console.log("member: " + members);
      call("/channel/new", "POST", members).then((response) => {
        console.log(response);
        setChannelList(response);
        setChosenDict({});
      });
    },
    [chosenDict]
  );

  return (
    <div className={styles["comp"]}>
      <IoCloseSharp
        size={27}
        className={styles["close-btn"]}
        onClick={() => {
          setIsMakeChannelModelOpen(false);
        }}
      />
      <div style={{ marginTop: "4vh" }}>
        {friendList.map((friend) => {
          return (
            <div
              className={`${styles["friend"]} ${
                chosenDict[friend.fnickname] ? styles["chosen"] : ""
              }`}
              onClick={() => {
                if (chosenDict[friend.fnickname]) {
                  setChosenDict((prev) => {
                    const copy = { ...prev };
                    delete copy[friend.fnickname];
                    return copy;
                  });
                } else {
                  setChosenDict((prev) => {
                    return { ...prev, [friend.fnickname]: friend };
                  });
                }
              }}
            >
              {friend.fnickname}
            </div>
          );
        })}
      </div>
      <div className={styles["create"]}>
        <div className={styles["chosen-list"]}>
          {Object.keys(chosenDict).map((nickname) => {
            return <span>{nickname}</span>;
          })}
        </div>
        <button onClick={handleCreateChannel}>채팅방 생성</button>
      </div>
    </div>
  );
};

export default MakeChannelModalComp;
