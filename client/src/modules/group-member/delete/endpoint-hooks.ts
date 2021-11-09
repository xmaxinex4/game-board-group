/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch } from "react-redux";

import { UserMembershipResponse } from "../../../../../src/types/types";
import { useApi } from "../../../hooks/useApi";
import { deleteMemberInActiveUserGroupMembership } from "../../../redux/active-user-group-memberships-slice";

export interface DeleteGroupMemberArgs {
  memberGroupMembershipId: string,
  onDeleted?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useDeleteGroupMember() {
  const { apiPost } = useApi();
  const dispatch = useDispatch();

  function deleteGroupMember(args: DeleteGroupMemberArgs): void {
    const {
      memberGroupMembershipId,
      onDeleted,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<UserMembershipResponse>("/group/delete-member", {
      groupMembershipId: memberGroupMembershipId,
    })
      .then(({ data }) => {
        dispatch(deleteMemberInActiveUserGroupMembership({
          memberGroupMembershipId: data.id,
        }));

        if (onDeleted) {
          onDeleted();
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

  return { deleteGroupMember };
}
