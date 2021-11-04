/* eslint-disable no-unused-vars, no-param-reassign */

import { PURGE } from "redux-persist";
import { createSlice } from "@reduxjs/toolkit";

import { UserPlayPreferenceResponse } from "../../../src/types/types";

export type ActiveUserPlayPreferencesState = {
  activeUserPlayPreferences: UserPlayPreferenceResponse[],
};

export type ActiveUserPlayPreferencesStateReducers = {
  setActiveUserPlayPreferences: (state: ActiveUserPlayPreferencesState, action: {
    type: string,
    payload: { playPreferences: UserPlayPreferenceResponse[]; },
  }) => void;
  upsertActiveUserPlayPreference: (state: ActiveUserPlayPreferencesState, action: {
    type: string,
    payload: { playPreference: UserPlayPreferenceResponse; },
  }) => void;
  deleteActiveUserPlayPreference: (state: ActiveUserPlayPreferencesState, action: {
    type: string,
    payload: { playPreferenceId: string; },
  }) => void;
};

export const activeUserPlayPreferencesSlice = createSlice<ActiveUserPlayPreferencesState, ActiveUserPlayPreferencesStateReducers>({
  name: "activeUserPlayPreferences",
  initialState: {
    activeUserPlayPreferences: [],
  },
  reducers: {
    setActiveUserPlayPreferences: (state, action: {
      type: string,
      payload: { playPreferences: UserPlayPreferenceResponse[]; },
    }) => {
      state.activeUserPlayPreferences = action.payload.playPreferences;
    },
    upsertActiveUserPlayPreference: (state, action: {
      type: string,
      payload: { playPreference: UserPlayPreferenceResponse; },
    }) => {
      const playPreferenceIndex = state.activeUserPlayPreferences.findIndex(
        (playPreference) => playPreference.id === action.payload.playPreference.id,
      );

      if (!(playPreferenceIndex < 0)) {
        // update
        state.activeUserPlayPreferences[playPreferenceIndex] = action.payload.playPreference;
      } else {
        // create
        state.activeUserPlayPreferences.push(action.payload.playPreference);
      }
    },
    deleteActiveUserPlayPreference: (state, action: {
      type: string,
      payload: { playPreferenceId: string; },
    }) => {
      const playPreferenceIndex = state.activeUserPlayPreferences.findIndex(
        (playPreference) => playPreference.id === action.payload.playPreferenceId,
      );

      if (!(playPreferenceIndex < 0)) {
        state.activeUserPlayPreferences.splice(playPreferenceIndex, 1);
      }
    },
  },
  extraReducers: (builder) => builder.addCase(PURGE, (state) => {
    state.activeUserPlayPreferences = [];
  }),
});

export const {
  setActiveUserPlayPreferences,
  upsertActiveUserPlayPreference,
  deleteActiveUserPlayPreference,
} = activeUserPlayPreferencesSlice.actions;

export const selectActiveUserPlayPreferences = (state: { activeUserPlayPreferencesState: ActiveUserPlayPreferencesState; }) => (
  state.activeUserPlayPreferencesState.activeUserPlayPreferences
);

export default activeUserPlayPreferencesSlice.reducer;
