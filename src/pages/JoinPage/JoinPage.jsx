import { useState } from "react";
import styles from "./JoinPage.module.css";
import { signup } from "../../service/ApiService";
import { useCallback } from "react";

function JoinPage() {
  const [email, setEmail] = useState();
  const [nickName, setNickName] = useState();
  const [password, setPassword] = useState();
  const [passwordCk, setPasswordCk] = useState();
  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [passwordCkCheck, setPasswordCkChekc] = useState(false);

  const emailHandler = (event) => {
    setEmail(event.target.value);
    const exptext = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+.[A-Za-z0-9-]+/;
    if (exptext.test(email) === false) {
      setEmailCheck(true);
    } else {
      setEmailCheck(false);
    }
  };
  const nickNameHandler = (event) => {
    setNickName(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
    const pw_exptext =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,20}$/;
    if (pw_exptext.test(event.target.value) === false) {
      setPasswordCheck(true);
    } else {
      setPasswordCheck(false);
    }
  };
  const passwordCkHandler = (event) => {
    setPasswordCk(event.target.value);
    if (password !== event.target.value) {
      setPasswordCkChekc(true);
    } else {
      setPasswordCkChekc(false);
    }
  };

  const join = useCallback(() => {
    // 비밀번호 일치 검증
    if (password === passwordCk) {
      signup({ email: email, password: password, nickName: nickName }).then(
        (response) => {
          window.location.href = "/login";
        }
      );
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
    // 닉네임 중복 검사
  }, [password, passwordCk, email, nickName]);

  return (
    <div className={styles["join"]}>
      <h2 className={styles["text"]}>회원가입</h2>
      <div className={styles["form"]}>
        <input
          className={styles["input"]}
          type="text"
          value={email}
          onChange={emailHandler}
          placeholder="이메일"
        />
        {emailCheck && (
          <div className={styles["warn-text"]}>
            이메일형식이 올바르지 않습니다.{" "}
          </div>
        )}
        <input
          className={styles["input"]}
          type="text"
          value={nickName}
          onChange={nickNameHandler}
          placeholder="닉네임"
        />
        <input
          className={styles["input"]}
          type="text"
          value={password}
          onChange={passwordHandler}
          placeholder="비밀번호"
        />
        {passwordCheck && (
          <div className={styles["warn-text"]}>
            영문, 숫자, 특수문자 조합 10자 이상
          </div>
        )}
        <input
          className={styles["input"]}
          type="text"
          value={passwordCk}
          onChange={passwordCkHandler}
          placeholder="비밀번호 확인"
        />
        {passwordCkCheck && (
          <div className={styles["warn-text"]}>일치하지 않습니다.</div>
        )}
        <button className={styles["btn"]} onClick={join}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default JoinPage;
