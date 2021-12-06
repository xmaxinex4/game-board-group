/* eslint-disable no-unused-vars, no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

import { LibraryGame } from "../../../src/types/types";
import { getFilterCount, sortAndFilterGames } from "../modules/library/filter/helpers";
import { LibraryGameFilters } from "../modules/library/filter/model";

export type ActiveUserGroupLibraryState = {
  groupId: string,
  activeUserGroupLibrary: LibraryGame[],
  currentLibaryFilters: LibraryGameFilters,
  currentSort: string,
};

export type ActiveUserGroupLibraryStateReducers = {
  setActiveUserGroupLibrary: (state: ActiveUserGroupLibraryState, action: {
    type: string,
    payload: { groupId: string, newLibrary: LibraryGame[]; },
  }) => void;
  setCurrentLibaryFilters: (state: ActiveUserGroupLibraryState, action: {
    type: string,
    payload: { newFilters: LibraryGameFilters; },
  }) => void;
  setCurrentLibarySort: (state: ActiveUserGroupLibraryState, action: {
    type: string,
    payload: { newSort: string; },
  }) => void;
};

export const ActiveUserGroupLibrarySlice = createSlice<ActiveUserGroupLibraryState, ActiveUserGroupLibraryStateReducers>({
  name: "ActiveUserGroupLibrary",
  initialState: {
    groupId: "",
    activeUserGroupLibrary: [],
    currentLibaryFilters: {},
    currentSort: "nameAsc",
  },
  reducers: {
    setActiveUserGroupLibrary: (state, action: {
      type: string,
      payload: { groupId: string, newLibrary: LibraryGame[]; },
    }) => {
      state.groupId = action.payload.groupId;
      state.activeUserGroupLibrary = action.payload.newLibrary;
    },
    setCurrentLibaryFilters: (state, action: {
      type: string,
      payload: { newFilters: LibraryGameFilters; },
    }) => {
      state.currentLibaryFilters = action.payload.newFilters;
    },
    setCurrentLibarySort: (state, action: {
      type: string,
      payload: { newSort: string; },
    }) => {
      state.currentSort = action.payload.newSort;
    },
  },
});

export const { setActiveUserGroupLibrary, setCurrentLibaryFilters, setCurrentLibarySort } = ActiveUserGroupLibrarySlice.actions;

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

export const selectActiveUserGroupLibraryCurrentSort = (state: { activeUserGroupLibraryState: ActiveUserGroupLibraryState; }) => (
  state.activeUserGroupLibraryState.currentSort
);

export const selectActiveUserGroupLibraryCurrentFilters = (state: { activeUserGroupLibraryState: ActiveUserGroupLibraryState; }) => (
  state.activeUserGroupLibraryState.currentLibaryFilters
);

export const getFilteredLibraryGames = (state: { activeUserGroupLibraryState: ActiveUserGroupLibraryState; }) => {
  const { activeUserGroupLibrary, currentSort, currentLibaryFilters } = state.activeUserGroupLibraryState;
  return sortAndFilterGames(activeUserGroupLibrary, currentSort, currentLibaryFilters);
};

export const getActiveFilterCount = (state: { activeUserGroupLibraryState: ActiveUserGroupLibraryState; }) => {
  const { currentLibaryFilters } = state.activeUserGroupLibraryState;
  return getFilterCount(currentLibaryFilters);
};

export default ActiveUserGroupLibrarySlice.reducer;
