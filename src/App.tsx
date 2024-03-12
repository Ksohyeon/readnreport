import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import RootLayout from "./pages/Root/RootLayout";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MyReportPage from "./pages/MyReportPage/MyReportPage";
import CalendarPage from "./pages/CalenderPage/CalendarPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import CreateReportPage from "./pages/CreateReportPage/CreateReportPage";
import ReportDetailPage from "./pages/ReportDetailPage/ReportDetailPage";
import SearchResultPage from "./pages/SearchResultPage/SearchResultPage";
import { useDispatch } from "react-redux";
import { login, logout, setNickname } from "./features/auth/authSlice";
import MyFriendPage from "pages/MyFriendPage/MyFriendPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "join", element: <JoinPage /> },
      { path: "friends", element: <MyFriendPage /> },
      {
        path: "bookshelf",
        element: <MyReportPage />,
      },
      { path: "calendar", element: <CalendarPage /> },
      { path: "write", element: <CreateReportPage /> },
      { path: "detail", element: <ReportDetailPage /> },
      { path: "search-result", element: <SearchResultPage /> },
    ],
  },
]);

const errorHandler = (msg: string) => {};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: Error) => {
      errorHandler(error.message);
    },
  }),
});

const App: React.FC = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("ACCESS_TOKEN");
  const nickname = localStorage.getItem("nickname");
  if (token && token !== "null") {
    dispatch(login());
    dispatch(setNickname(nickname ? nickname : ""));
  } else {
    dispatch(logout());
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
