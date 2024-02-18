import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";

import RootLayout from "./pages/Root/Root";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MyReportPage from "./pages/MyReportPage/MyReportPage";
import CalendarPage from "./pages/CalenderPage/CalendarPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import CreateReportPage from "./pages/CreateReportPage/CreateReportPage";
import ReportDetailPage from "./pages/ReportDetailPage/ReportDetailPage";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/auth/authSlice";
import SearchResultPage from "./pages/SearchResultPage/SearchResultPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "join", element: <JoinPage /> },
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

function App() {
  // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token && token !== "null") {
    dispatch(login());
  } else {
    dispatch(logout());
  }

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
