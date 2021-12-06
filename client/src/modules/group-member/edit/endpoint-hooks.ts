/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch } from "react-redux";

import { UserMembershipResponse } from "../../../../../src/types/types";
import { useApi } from "../../../hooks/useApi";
import { updateMemberInActiveUserGroupMembershipAdminStatus } from "../../../redux/active-user-group-memberships-slice";

export interface EditAdminStatusOfGroupMemberArgs {
  groupMembershipId: string,
  isAdmin: boolean,
  onAdminStatusUpdated?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useEditGroupMember() {
  const { apiPost } = useApi();
  const dispatch = useDispatch();

  function editAdminStatusOfGroupMember(args: EditAdminStatusOfGroupMemberArgs): void {
    const {
      groupMembershipId,
      isAdmin,
      onAdminStatusUpdated,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<UserMembershipResponse>("/group/update-admin-status-of-member", {
      groupMembershipId,
      isAdmin,
    })
      .then(({ data }) => {
        dispatch(updateMemberInActiveUserGroupMembershipAdminStatus({
          groupMembershipId: data.id, isAdmin: data.isAdmin,
        }));

        if (onAdminStatusUpdated) {
          onAdminStatusUpdated();
        }
      })
      .catch((error: Error) => {
        // TODO: Better error handling
        console.log("edit admin status of group member error: ", error);
        if (onError) {
          onError(error);
        }
      })
      .finally(() => {
        if (setIsLoading) {
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      });
  }

  return { editAdminStatusOfGroupMember };
}
