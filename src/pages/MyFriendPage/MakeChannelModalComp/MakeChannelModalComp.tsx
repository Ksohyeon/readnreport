import React, { useCallback, useState } from "react";
import styles from "./MakeChannelModalComp.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Dictionary } from "lodash";
import { call } from "service/ApiService";
import { Channel, Friend } from "../MyFriendPage";

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
      call("/channel/new-group", "POST", members).then((response) => {
        console.log(response);
        setChannelList(response);
        setChosenDict({});
      });
      setIsMakeChannelModelOpen(false);
    },
    [chosenDict]
  );

  return (
    <div className={styles["comp"]}>
      <IoIosCloseCircleOutline
        size={30}
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
        <button onClick={handleCreateChannel}>채팅방{`\n`}생성</button>
      </div>
    </div>
  );
};

export default MakeChannelModalComp;
