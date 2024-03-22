import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./UserInfoPage.module.css";
import { call } from "service/ApiService";

interface UserInfo {
  email: string;
  nickname: string;
}

type PageState = "check" | "update";

const UserInfoPage = () => {
  const [pageState, setPageState] = useState<PageState>("check");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    nickname: "",
  });
  const emailRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const handleUpdateInfo = useCallback(() => {
    if (!(emailRef.current && nicknameRef.current)) return;
    const newInfo = {
      email: emailRef.current.value,
      nickname: nicknameRef.current.value,
    };
    call("/auth/info", "PUT", newInfo).then((response) => {
      if (nicknameRef.current)
        localStorage.setItem("nickname", nicknameRef.current.value);
      setUserInfo(response[0]);
      setPageState("check");
    });
  }, [userInfo]);

  useEffect(() => {
    if (emailRef.current && nicknameRef.current) {
      emailRef.current.value = userInfo.email;
      nicknameRef.current.value = userInfo.nickname;
    }
  }, [pageState]);

  useEffect(() => {
    call("/auth/info", "GET").then((response) => {
      console.log(response);
      const user = response[0];
      setUserInfo({
        email: user.email,
        nickname: user.nickname,
      });
    });
  }, []);

  return (
    <>
      <div className={styles["page"]}>
        {pageState == "check" && (
          <>
            <div className={styles["info-wrapper"]}>
              <h2>나의 정보</h2>
              <div className={styles["img"]}></div>
              <div style={{ width: "100%" }}>
                <div className={styles["nickname"]}>
                  닉네임 &nbsp;| &nbsp;<span>{userInfo.nickname}</span>
                </div>

                <div className={styles["email"]}>
                  이메일 &nbsp;| &nbsp;<span>{userInfo.email}</span>
                </div>
                <div className={styles["btn-group"]}>
                  <button
                    onClick={() => {
                      setPageState("update");
                    }}
                  >
                    정보 수정
                  </button>
                  <button>비밀번호 변경</button>
                </div>
              </div>
            </div>
          </>
        )}
        {pageState === "update" && (
          <>
            <div className={styles["info-wrapper"]}>
              <h2>나의 정보</h2>
              <div className={styles["img"]}></div>
              <form style={{ width: "100%" }}>
                <input
                  ref={nicknameRef}
                  type="text"
                  className={styles["nickname"]}
                  placeholder="닉네임"
                />
                <input
                  ref={emailRef}
                  type="text"
                  className={styles["email"]}
                  placeholder="이메일"
                />
                <div className={styles["btn-group"]}>
                  <button onClick={handleUpdateInfo}>수정 완료</button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserInfoPage;
