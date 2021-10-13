/* eslint-disable no-unused-vars, no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

import { Group } from ".prisma/client";

export type GroupState = {
  userGroups: Group[] | undefined,
  activeGroupId: string;
};

export type GroupStateReducers = {
  setUserGroups: (state: GroupState, action: {
    type: string,
    payload: { groups: Group[]; },
  }) => void;
  addUserGroup: (state: GroupState, action: {
    type: string,
    payload: { group: Group; },
  }) => void;
  setActiveGroupId: (state: GroupState, action: {
    type: string,
    payload: { id: string; },
  }) => void;
};

export const groupSlice = createSlice<GroupState, GroupStateReducers>({
  name: "group",
  initialState: {
    userGroups: undefined,
    activeGroupId: "",
  },
  reducers: {
    setUserGroups: (state, action: {
      type: string,
      payload: { groups: Group[]; },
    }) => {
      state.userGroups = action.payload.groups;
    },
    addUserGroup: (state, action: {
      type: string,
      payload: { group: Group; },
    }) => {
      const newUserGroup = state.userGroups || [];
      state.userGroups = newUserGroup.concat(action.payload.group);
    },
    setActiveGroupId: (state, action: {
      type: string,
      payload: { id: string; },
    }) => {
      state.activeGroupId = action.payload.id;
    },
  },
});

export const { addUserGroup, setActiveGroupId, setUserGroups } = groupSlice.actions;
export const selectActiveGroup = (state: { groupState: GroupState; }) => {
  console.log("groupState: ", state);
  const activeGroup = state.groupState?.userGroups?.find((group) => group.id === state.groupState.activeGroupId);
  return activeGroup || undefined;
};

export default groupSlice.reducer;
