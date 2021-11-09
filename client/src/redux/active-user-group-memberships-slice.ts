/* eslint-disable no-unused-vars, no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

import { ActiveUserGroupMembershipsResponse, GroupMembershipResponse } from "../../../src/types/types";

export type ActiveUserGroupMembershipsState = {
  activeUserGroupMemberships: ActiveUserGroupMembershipsResponse,
  selectedActiveUserGroupMembershipId: string;
};

export type ActiveUserGroupMembershipsStateReducers = {
  setActiveUserGroupMemberships: (state: ActiveUserGroupMembershipsState, action: {
    type: string,
    payload: { groupMemberships: GroupMembershipResponse[]; },
  }) => void;
  addActiveUserGroupMembership: (state: ActiveUserGroupMembershipsState, action: {
    type: string,
    payload: { groupMembership: GroupMembershipResponse; },
  }) => void;
  setSelectedActiveUserGroupMembershipId: (state: ActiveUserGroupMembershipsState, action: {
    type: string,
    payload: { id: string; },
  }) => void;
  updateActiveUserGroupMembershipActiveInviteLink: (state: ActiveUserGroupMembershipsState, action: {
    type: string,
    payload: { groupMembershipId: string, link: string; },
  }) => void;
  updateActiveUserGroupMembershipAdminStatus: (state: ActiveUserGroupMembershipsState, action: {
    type: string,
    payload: { activeUserGroupMembershipId: string, memberGroupMembershipId: string, isAdmin: boolean; },
  }) => void;
};

export const activeUserGroupMembershipsSlice = createSlice<ActiveUserGroupMembershipsState, ActiveUserGroupMembershipsStateReducers>({
  name: "activeUserGroupMemberships",
  initialState: {
    activeUserGroupMemberships: { groupMemberships: [] },
    selectedActiveUserGroupMembershipId: localStorage.getItem("gbg-selected-active-user-group-membership") || "",
  },
  reducers: {
    setActiveUserGroupMemberships: (state, action: {
      type: string,
      payload: { groupMemberships: GroupMembershipResponse[]; },
    }) => {
      state.activeUserGroupMemberships = { groupMemberships: action.payload.groupMemberships };
    },
    addActiveUserGroupMembership: (state, action: {
      type: string,
      payload: { groupMembership: GroupMembershipResponse; },
    }) => {
      const newUserGroup = state.activeUserGroupMemberships.groupMemberships;
      state.activeUserGroupMemberships = { groupMemberships: newUserGroup.concat(action.payload.groupMembership) };

      localStorage.setItem("gbg-selected-active-user-group-membership", action.payload.groupMembership.id);
      state.selectedActiveUserGroupMembershipId = action.payload.groupMembership.id;
    },
    updateActiveUserGroupMembershipActiveInviteLink: (state, action: {
      type: string,
      payload: { groupMembershipId: string, link: string; },
    }) => {
      const groupMembershipIndex = state.activeUserGroupMemberships.groupMemberships.findIndex(
        (membership) => membership.id === action.payload.groupMembershipId,
      );

      if (!(groupMembershipIndex < 0)) {
        state.activeUserGroupMemberships.groupMemberships[groupMembershipIndex].activeInvitationLink = action.payload.link;
      }
    },
    updateActiveUserGroupMembershipAdminStatus: (state, action: {
      type: string,
      payload: { activeUserGroupMembershipId: string, memberGroupMembershipId: string, isAdmin: boolean; },
    }) => {
      const activeUserGroupMembershipIndex = state.activeUserGroupMemberships.groupMemberships.findIndex(
        (membership) => membership.id === action.payload.activeUserGroupMembershipId,
      );

      if (!(activeUserGroupMembershipIndex < 0)) {
        const groupMembershipIndex = state.activeUserGroupMemberships.groupMemberships[activeUserGroupMembershipIndex].group.members.findIndex(
          (membership) => membership.id === action.payload.memberGroupMembershipId,
        );

        if (!(groupMembershipIndex < 0)) {
          state.activeUserGroupMemberships.groupMemberships[activeUserGroupMembershipIndex].group.members[groupMembershipIndex] = {
            ...state.activeUserGroupMemberships.groupMemberships[activeUserGroupMembershipIndex].group.members[groupMembershipIndex],
            isAdmin: action.payload.isAdmin,
          };
        }
      }
    },
    setSelectedActiveUserGroupMembershipId: (state, action: {
      type: string,
      payload: { id: string; },
    }) => {
      localStorage.setItem("gbg-selected-active-user-group-membership", action.payload.id);
      state.selectedActiveUserGroupMembershipId = action.payload.id;
    },
  },
});

export const {
  setActiveUserGroupMemberships,
  addActiveUserGroupMembership,
  setSelectedActiveUserGroupMembershipId,
  updateActiveUserGroupMembershipActiveInviteLink,
  updateActiveUserGroupMembershipAdminStatus,
} = activeUserGroupMembershipsSlice.actions;

export const selectedActiveUserGroupMembership = (state: { activeUserGroupMembershipsState: ActiveUserGroupMembershipsState; }) => (
  state.activeUserGroupMembershipsState.activeUserGroupMemberships.groupMemberships.find(
    (groupMembership) => groupMembership.id === state.activeUserGroupMembershipsState.selectedActiveUserGroupMembershipId,
  )
);

export const activeUserGroupMemberships = (state: { activeUserGroupMembershipsState: ActiveUserGroupMembershipsState; }) => (
  state.activeUserGroupMembershipsState.activeUserGroupMemberships
);

export default activeUserGroupMembershipsSlice.reducer;
