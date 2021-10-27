/* eslint-disable no-unused-vars, no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

import { LibraryReponse } from "../../../src/types/types";

export type ActiveUserGroupLibraryState = {
  activeUserGroupLibrary: LibraryReponse,
};

export type ActiveUserGroupLibraryStateReducers = {
  setActiveUserGroupLibrary: (state: ActiveUserGroupLibraryState, action: {
    type: string,
    payload: { newLibrary: LibraryReponse; },
  }) => void;
};

export const ActiveUserGroupLibrarySlice = createSlice<ActiveUserGroupLibraryState, ActiveUserGroupLibraryStateReducers>({
  name: "ActiveUserGroupLibrary",
  initialState: {
    activeUserGroupLibrary: { library: {} },
  },
  reducers: {
    setActiveUserGroupLibrary: (state, action: {
      type: string,
      payload: { newLibrary: LibraryReponse; },
    }) => {
      state.activeUserGroupLibrary = { library: action.payload.newLibrary.library };
    },
  },
});

export const { setActiveUserGroupLibrary } = ActiveUserGroupLibrarySlice.actions;

export const selectActiveUserGroupLibrary = (state: { activeUserGroupLibraryState: ActiveUserGroupLibraryState; }) => (
  state.activeUserGroupLibraryState.activeUserGroupLibrary
);

export default ActiveUserGroupLibrarySlice.reducer;
