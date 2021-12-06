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
    payload: { groupMembershipId: string, isAdmin: boolean; },
  }) => void;

  deleteMemberInActiveUserGroupMembership: (state: ActiveUserGroupMembershipsState, action: {
    type: string,
    payload: { groupMembershipId: string; },
  }) => void;

  transferOwnershipOfActiveUserGroup: (state: ActiveUserGroupMembershipsState, action: {
    type: string,
    payload: { newOwnerGroupMembershipId: string; },
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
      const activeGroupMembershipIndex = state.activeUserGroupMemberships.groupMemberships.findIndex(
        (membership) => membership.id === state.selectedActiveUserGroupMembershipId,
      );

      if (!(activeGroupMembershipIndex < 0)) {
        state.activeUserGroupMemberships.groupMemberships[activeGroupMembershipIndex].group.name = action.payload.groupName;
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
      payload: { groupMembershipId: string, isAdmin: boolean; },
    }) => {
      const activeGroupMembershipIndex = state.activeUserGroupMemberships.groupMemberships.findIndex(
        (membership) => membership.id === state.selectedActiveUserGroupMembershipId,
      );

      if (!(activeGroupMembershipIndex < 0)) {
        // if the active user is changing their own admin status,
        // we need to update the status in the active user membership as well as the nested group membership list
        if (state.activeUserGroupMemberships.groupMemberships[activeGroupMembershipIndex].id === action.payload.groupMembershipId) {
          state.activeUserGroupMemberships.groupMemberships[activeGroupMembershipIndex].isAdmin = action.payload.isAdmin;
        }

        const groupMembershipIndex = state.activeUserGroupMemberships.groupMemberships[activeGroupMembershipIndex].group.members.findIndex(
          (membership) => membership.id === action.payload.groupMembershipId,
        );

        if (!(groupMembershipIndex < 0)) {
          // eslint-disable-next-line max-len
          state.activeUserGroupMemberships.groupMemberships[activeGroupMembershipIndex].group.members[groupMembershipIndex].isAdmin = action.payload.isAdmin;
        }
      }
    },

    deleteMemberInActiveUserGroupMembership: (state, action: {
      type: string,
      payload: { groupMembershipId: string; },
    }) => {
      const activeGroupMembershipIndex = state.activeUserGroupMemberships.groupMemberships.findIndex(
        (membership) => membership.id === state.selectedActiveUserGroupMembershipId,
      );

      if (!(activeGroupMembershipIndex < 0)) {
        const groupMembershipIndex = state.activeUserGroupMemberships.groupMemberships[activeGroupMembershipIndex].group.members.findIndex(
          (membership) => membership.id === action.payload.groupMembershipId,
        );

        if (!(groupMembershipIndex < 0)) {
          state.activeUserGroupMemberships.groupMemberships[activeGroupMembershipIndex].group.members.splice(groupMembershipIndex, 1);
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

    transferOwnershipOfActiveUserGroup: (state, action: {
      type: string,
      payload: { newOwnerGroupMembershipId: string; },
    }) => {
      const activeUserGroupMembershipIndex = state.activeUserGroupMemberships.groupMemberships.findIndex(
        (membership) => membership.id === state.selectedActiveUserGroupMembershipId,
      );

      if (!(activeUserGroupMembershipIndex < 0)) {
        const newOwnerIndex = state.activeUserGroupMemberships.groupMemberships[activeUserGroupMembershipIndex].group.members.findIndex(
          (membership) => membership.id === action.payload.newOwnerGroupMembershipId,
        );

        if (!(newOwnerIndex < 0)) {
          state.activeUserGroupMemberships.groupMemberships[activeUserGroupMembershipIndex].group.members[newOwnerIndex].isAdmin = true;
          const newOwner = state.activeUserGroupMemberships.groupMemberships[activeUserGroupMembershipIndex].group.members[newOwnerIndex];
          state.activeUserGroupMemberships.groupMemberships[activeUserGroupMembershipIndex].group.ownedByUser = newOwner.user;
        }
      }
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
  transferOwnershipOfActiveUserGroup,
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
