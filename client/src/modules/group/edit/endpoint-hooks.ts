/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { editActiveUserGroupMembershipGroupName, selectedActiveUserGroupMembership } from "../../../redux/active-user-group-memberships-slice";
import { GroupResponse } from "../../../../../src/types/types";
import { useApi } from "../../../hooks/useApi";

export interface EditActiveGroupArgs {
  name: string;
  onActiveGroupEdited?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useEditActiveGroup() {
  const { apiPost } = useApi();
  const dispatch = useDispatch();
  const activeGroupMembership = useSelector(selectedActiveUserGroupMembership);
  const activeGroupId = activeGroupMembership?.group.id;

  function editActiveGroup(args: EditActiveGroupArgs): void {
    const {
      name,
      onActiveGroupEdited,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<GroupResponse>("/group/edit", {
      name,
      groupId: activeGroupId,
      groupMembershipId: activeGroupMembership?.id,
    })
      .then(({ data }) => {
        dispatch(editActiveUserGroupMembershipGroupName({
          groupName: data.name,
        }));

        if (onActiveGroupEdited) {
          onActiveGroupEdited();
        }
      })
      .catch((error: Error) => {
        // TODO: Better error handling
        console.log("edit active group error: ", error);
        if (onError) {
          onError(error);
        }
      })
      .finally(() => {
        if (setIsLoading) {
          setIsLoading(false);
        }
      });
  }

  return { editActiveGroup };
}
