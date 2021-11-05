/* eslint-disable no-unused-vars, no-param-reassign */

import { PURGE } from "redux-persist";
import { createSlice } from "@reduxjs/toolkit";

import { ActiveUserResponse } from "../../../src/types/types";

export type ActiveUserState = {
  activeUser: ActiveUserResponse | undefined,
};

export type ActiveUserStateReducers = {
  setActiveUser: (state: ActiveUserState, action: {
    type: string,
    payload: { user: ActiveUserResponse | undefined; },
  }) => void;
};

export const activeUserSlice = createSlice<ActiveUserState, ActiveUserStateReducers>({
  name: "activeUser",
  initialState: {
    activeUser: undefined,
  },
  reducers: {
    setActiveUser: (state, action: {
      type: string,
      payload: { user: ActiveUserResponse | undefined; },
    }) => {
      console.log("state.activeUser: ", state.activeUser);
      console.log("action.payload.user: ", action.payload.user);
      state.activeUser = action.payload.user;
    },
  },
  extraReducers: (builder) => builder.addCase(PURGE, (state) => {
    state.activeUser = undefined;
  }),
});

export const { setActiveUser } = activeUserSlice.actions;
export const selectActiveUser = (state: { activeUser: ActiveUserState; }) => state.activeUser.activeUser;

export default activeUserSlice.reducer;
