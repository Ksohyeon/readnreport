import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "../features/sideBar/sideBarSlice";
import authReducer from "../features/auth/authSlice";

export default configureStore({
  reducer: { sideBar: sideBarReducer, auth: authReducer },
});
