import { UserProps } from "@components/models/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { UserInfoModel } from "./models";

const initialState = {
    userInfo: null,
    token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: any, action: PayloadAction<UserProps>) => {
        state.userInfo = action.payload
    },
    setToken: (state: any, action: PayloadAction<string>) => {
        state.token = action.payload
    },
    logout: (state: any,) => {
        state.userInfo = null;
        state.token = null;
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
