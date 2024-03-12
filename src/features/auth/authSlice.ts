import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    nickname: "",
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.nickname = "";
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
  },
});

export const { login, logout, setNickname } = authSlice.actions;

export default authSlice.reducer;
