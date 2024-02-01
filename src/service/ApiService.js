import { API_BASE_URL } from "../config/api-config";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  console.log("accessToken: ", accessToken);
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }
  console.log("Authorization: ", headers.get("Authorization"));
  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    options.body = JSON.stringify(request);
  }
  console.log(options);

  return fetch(options.url, options)
    .then((response) => {
      if (response.status === 200 && response) {
        console.log(response);
        return response.json();
      } else if (response.status === 403) {
        window.location.href = "/login";
      } else {
        Promise.reject(response);
        throw Error(response);
      }
    })
    .catch((error) => {
      console.log("http error");
      console.log(error);
    });
}

export function signin(userDTO) {
  console.log(userDTO);
  return call("/auth/signin", "POST", userDTO).then((response) => {
    console.log("response: ", response);
    if (response?.token) {
      localStorage.setItem("ACCESS_TOKEN", response.token);
      window.location.href = "/";
    } else {
      alert("로그인 실패");
      window.location.reload();
    }
  });
}

export function signout() {
  localStorage.setItem("ACCESS_TOKEN", null);
  window.location.href = "/login";
}

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO);
}

export function searchBook(text, display) {
  const encodedText = encodeURIComponent(text);
  return call(`/book?query=${encodedText}&display=${display}`, "GET");
}
