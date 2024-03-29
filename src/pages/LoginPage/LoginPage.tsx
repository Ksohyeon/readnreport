import React, { useEffect, useRef } from "react";
import styles from "./LoginPage.module.css";
import { BiSolidBookBookmark } from "react-icons/bi";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../../service/ApiService";

const LoginPage: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const submit = useCallback(() => {
    if (!(emailRef.current && pwRef.current)) return;
    console.log("!!: ", emailRef.current.value, pwRef.current.value);
    if (emailRef.current.value !== "" && pwRef.current.value !== "")
      signin({ email: emailRef.current.value, password: pwRef.current.value });
    else alert("이메일과 비밀번호를 모두 입력해 주세요");
  }, []);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    submit();
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        submit();
      }
    });
  }, []);

  return (
    <div className={styles["login"]}>
      <div className={styles["form"]}>
        <BiSolidBookBookmark className={styles["icon"]} size={70} />
        <input
          ref={emailRef}
          type="text"
          className={styles["input-form"]}
          placeholder="이메일을 입력해 주세요."
        />
        <input
          ref={pwRef}
          type="password"
          className={styles["input-form"]}
          placeholder="비밀번호를 입력해 주세요."
        />
        <button className={styles["login-btn"]} onClick={handleSubmit}>
          로그인
        </button>
        {/* <button
          className={styles["google-login"]}
          onClick={() => {
            window.location.replace(url);
          }}
        >
          <img className={styles["google-icon"]} src={google} alt="google" />
          <div>Google 계정으로 로그인</div>
        </button> */}
        <button className={styles["join-btn"]}>
          <Link to="/join" className={styles["text-link"]}>
            회원가입
          </Link>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
