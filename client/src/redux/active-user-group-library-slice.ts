/* eslint-disable no-unused-vars, no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

import { LibraryGame, LibraryReponse } from "../../../src/types/types";

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

const getRecentGames = (games: LibraryGame[]): LibraryGame[] => {
  const sortedGames = games;
  sortedGames.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return sortedGames.slice(0, 3);
};

export const selectActiveUserGroupLibraryRecentGames = (state: { activeUserGroupLibraryState: ActiveUserGroupLibraryState; }) => (
  getRecentGames(Object.values(state.activeUserGroupLibraryState.activeUserGroupLibrary.library))
);

export default ActiveUserGroupLibrarySlice.reducer;
