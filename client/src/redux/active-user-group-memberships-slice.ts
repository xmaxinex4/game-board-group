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
  editActiveUserGroupMembershipGroupName: (state: ActiveUserGroupMembershipsState, action: {
    type: string,
    payload: { groupName: string; },
  }) => void;
  setSelectedActiveUserGroupMembershipId: (state: ActiveUserGroupMembershipsState, action: {
    type: string,
    payload: { id: string; },
  }) => void;
  updateActiveUserGroupMembershipActiveInviteLink: (state: ActiveUserGroupMembershipsState, action: {
    type: string,
    payload: { groupMembershipId: string, link: string; },
  }) => void;
  updateMemberInActiveUserGroupMembershipAdminStatus: (state: ActiveUserGroupMembershipsState, action: {
    type: string,
    payload: { memberGroupMembershipId: string, isAdmin: boolean; },
  }) => void;
  deleteMemberInActiveUserGroupMembership: (state: ActiveUserGroupMembershipsState, action: {
    type: string,
    payload: { memberGroupMembershipId: string; },
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
    editActiveUserGroupMembershipGroupName: (state, action: {
      type: string,
      payload: { groupName: string; },
    }) => {
      const activeUserGroupMembershipIndex = state.activeUserGroupMemberships.groupMemberships.findIndex(
        (membership) => membership.id === state.selectedActiveUserGroupMembershipId,
      );

      if (!(activeUserGroupMembershipIndex < 0)) {
        state.activeUserGroupMemberships.groupMemberships[activeUserGroupMembershipIndex].group.name = action.payload.groupName;
      }
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
    updateMemberInActiveUserGroupMembershipAdminStatus: (state, action: {
      type: string,
      payload: { memberGroupMembershipId: string, isAdmin: boolean; },
    }) => {
      const activeUserGroupMembershipIndex = state.activeUserGroupMemberships.groupMemberships.findIndex(
        (membership) => membership.id === state.selectedActiveUserGroupMembershipId,
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
    deleteMemberInActiveUserGroupMembership: (state, action: {
      type: string,
      payload: { memberGroupMembershipId: string; },
    }) => {
      const activeUserGroupMembershipIndex = state.activeUserGroupMemberships.groupMemberships.findIndex(
        (membership) => membership.id === state.selectedActiveUserGroupMembershipId,
      );

      if (!(activeUserGroupMembershipIndex < 0)) {
        const groupMembershipIndex = state.activeUserGroupMemberships.groupMemberships[activeUserGroupMembershipIndex].group.members.findIndex(
          (membership) => membership.id === action.payload.memberGroupMembershipId,
        );

        if (!(groupMembershipIndex < 0)) {
          state.activeUserGroupMemberships.groupMemberships[activeUserGroupMembershipIndex].group.members.splice(groupMembershipIndex, 1);
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
  editActiveUserGroupMembershipGroupName,
  setSelectedActiveUserGroupMembershipId,
  updateActiveUserGroupMembershipActiveInviteLink,
  updateMemberInActiveUserGroupMembershipAdminStatus,
  deleteMemberInActiveUserGroupMembership,
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
