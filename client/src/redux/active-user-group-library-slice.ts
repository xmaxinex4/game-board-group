/* eslint-disable no-unused-vars, no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

import { LibraryGame } from "../../../src/types/types";

export type ActiveUserGroupLibraryState = {
  groupId: string,
  activeUserGroupLibrary: LibraryGame[],
};

export type ActiveUserGroupLibraryStateReducers = {
  setActiveUserGroupLibrary: (state: ActiveUserGroupLibraryState, action: {
    type: string,
    payload: { groupId: string, newLibrary: LibraryGame[]; },
  }) => void;
};

export const ActiveUserGroupLibrarySlice = createSlice<ActiveUserGroupLibraryState, ActiveUserGroupLibraryStateReducers>({
  name: "ActiveUserGroupLibrary",
  initialState: {
    groupId: "",
    activeUserGroupLibrary: [],
  },
  reducers: {
    setActiveUserGroupLibrary: (state, action: {
      type: string,
      payload: { groupId: string, newLibrary: LibraryGame[]; },
    }) => {
      state.groupId = action.payload.groupId;
      state.activeUserGroupLibrary = action.payload.newLibrary;
    },
  },
});

export const { setActiveUserGroupLibrary } = ActiveUserGroupLibrarySlice.actions;

export const selectActiveUserGroupLibrary = (state: { activeUserGroupLibraryState: ActiveUserGroupLibraryState; }) => (
  state.activeUserGroupLibraryState
);

const getRecentGames = (games: LibraryGame[]): LibraryGame[] => {
  const sortedGames = [...games];

  sortedGames.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return sortedGames.slice(0, 3);
};

export const selectActiveUserGroupLibraryRecentGames = (state: { activeUserGroupLibraryState: ActiveUserGroupLibraryState; }) => (
  getRecentGames(state.activeUserGroupLibraryState.activeUserGroupLibrary)
);

export default ActiveUserGroupLibrarySlice.reducer;
