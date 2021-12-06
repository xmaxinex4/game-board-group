/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch } from "react-redux";

import { UserMembershipResponse } from "../../../../../src/types/types";
import { useApi } from "../../../hooks/useApi";
import { deleteMemberInActiveUserGroupMembership } from "../../../redux/active-user-group-memberships-slice";
import { useGetLibrary } from "../../library/endpoint-hooks";

export interface DeleteGroupMemberArgs {
  groupMembershipId: string,
  onDeleted?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useDeleteGroupMember() {
  const { apiPost } = useApi();
  const dispatch = useDispatch();
  const { getLibrary } = useGetLibrary();

  function deleteGroupMember(args: DeleteGroupMemberArgs): void {
    const {
      groupMembershipId,
      onDeleted,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<UserMembershipResponse>("/group/delete-member", {
      groupMembershipId,
    })
      .then(({ data }) => {
        dispatch(deleteMemberInActiveUserGroupMembership({
          groupMembershipId: data.id,
        }));

        getLibrary({}); // refreshes group library in the background

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
