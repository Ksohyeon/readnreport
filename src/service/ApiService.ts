import { API_BASE_URL } from "../config/api-config";

interface Options {
  headers: Headers;
  url: string;
  method: string;
  body: string | null;
}

export function call(api: string, method: string, request?: object) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  console.log("accessToken: ", accessToken);
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }
  console.log("Authorization: ", headers.get("Authorization"));
  let options: Options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
    body: null,
  };

  if (request) {
    options.body = JSON.stringify(request);
  }
  console.log(options);

  return fetch(options.url, options)
    .then((response) => {
      if (response.status === 200 && response) {
        console.log("api response: ", response);
        return response.json();
      } else if (response.status === 403 || response.status === 400) {
        window.location.href = "/login";
      } else {
        Promise.reject(response);
        throw Error(response.json.toString());
      }
    })
    .catch((error) => {
      console.log("http error");
      console.log(error);
    });
}

interface User {
  email: string;
  password: string;
  nickname?: string;
}

export function signin(userDTO: User) {
  console.log(userDTO);
  return call("/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      localStorage.setItem("ACCESS_TOKEN", response.token);
      localStorage.setItem("nickname", response.nickname);
      window.location.href = "/";
    } else {
      alert("로그인 실패");
      window.location.reload();
    }
  });
}

export function signout() {
  localStorage.setItem("ACCESS_TOKEN", "null");
  window.location.href = "/login";
}

export function signup(userDTO: User) {
  return call("/auth/signup", "POST", userDTO);
}

export function searchBook(text: string, display: number) {
  const encodedText = encodeURIComponent(text);
  return call(`/book?query=${encodedText}&display=${display}`, "GET");
}
