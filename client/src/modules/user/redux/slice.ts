/* eslint-disable no-unused-vars, no-param-reassign */

import { PURGE } from "redux-persist";
import { createSlice } from "@reduxjs/toolkit";
import { UserMeResponse } from "../../../api-types/response-types";

export type UserState = {
  activeUser: UserMeResponse | undefined,
};

export type UserStateReducers = {
  setActiveUser: (state: UserState, action: {
    type: string,
    payload: { user: UserMeResponse | undefined; },
  }) => void;
};

export const userSlice = createSlice<UserState, UserStateReducers>({
  name: "user",
  initialState: {
    activeUser: undefined,
  },
  reducers: {
    setActiveUser: (state, action: {
      type: string,
      payload: { user: UserMeResponse | undefined; },
    }) => {
      state.activeUser = action.payload.user;
    },
  },
  extraReducers: (builder) => builder.addCase(PURGE, (state) => {
    state.activeUser = undefined;
  }),
});

export const { setActiveUser } = userSlice.actions;
export const selectActiveUser = (state: { activeUser: UserState; }) => state.activeUser.activeUser;

export default userSlice.reducer;
