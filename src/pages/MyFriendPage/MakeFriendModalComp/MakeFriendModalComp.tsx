import { useCallback, useRef } from "react";
import styles from "./MakeFriendModalComp.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { call } from "service/ApiService";
import { Friend } from "../MyFriendPage";

interface OwnProps {
  setFriendList: React.Dispatch<React.SetStateAction<Friend[]>>;
  setIsMakeFriendModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MakeFriendModalComp = ({
  setFriendList,
  setIsMakeFriendModalOpen,
}: OwnProps) => {
  const addFriendInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!addFriendInputRef.current) return;
      call("/friend/add", "POST", {
        fnickname: addFriendInputRef.current.value,
      }).then((response) => {
        setFriendList(response.data);
      });
    },
    []
  );

  return (
    <div className={styles["comp"]}>
      <div className={styles["text1"]}>
        친구 추가
        <span
          className={styles["close-btn"]}
          onClick={() => setIsMakeFriendModalOpen(false)}
        >
          <IoIosCloseCircleOutline size={30} />
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <input ref={addFriendInputRef} placeholder="닉네임으로 추가" />
        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default MakeFriendModalComp;
