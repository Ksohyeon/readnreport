import styles from "./LoginPage.module.css";
import { BiSolidBookBookmark } from "react-icons/bi";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import google from "../../img/google_login.png";
import { signin } from "../../service/ApiService";

function LoginPage() {
  const [idValue, setId] = useState("");
  const [pwValue, setPw] = useState("");

  const url = "http://localhost:8080/login";

  const IdHandler = (event) => {
    setId(event.target.value);
  };

  const pwHandler = (event) => {
    setPw(event.target.value);
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      signin({ email: idValue, password: pwValue });
    },
    [idValue, pwValue]
  );

  return (
    <div className={styles["login"]}>
      <div className={styles["form"]}>
        <BiSolidBookBookmark className={styles["icon"]} size={70} />
        <input
          type="text"
          value={idValue}
          onChange={IdHandler}
          className={styles["input-form"]}
          placeholder="아이디를 입력해 주세요."
        />
        <input
          type="password"
          value={pwValue}
          onChange={pwHandler}
          className={styles["input-form"]}
          placeholder="비밀번호를 입력해 주세요."
        />
        <button className={styles["login-btn"]} onClick={handleSubmit}>
          로그인
        </button>
        <button
          className={styles["google-login"]}
          onClick={() => {
            window.location.replace(url);
          }}
        >
          <img className={styles["google-icon"]} src={google} alt="google" />
          <div>Google 계정으로 로그인</div>
        </button>
        <button className={styles["join-btn"]}>
          <Link to="/join" className={styles["text-link"]}>
            회원가입
          </Link>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
