import { UserProps } from "@components/models/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
// import { UserInfoModel } from "./models";

const initialState = {
    userInfo: null,
    token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: RootState, action: PayloadAction<UserProps>) => {
        state.userInfo = action.payload
    },
    setToken: (state: RootState, action: PayloadAction<string>) => {
        state.token = action.payload
    },
    logout: (state: RootState,) => {
        state.userInfo = null;
        state.token = null;
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
