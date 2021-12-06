/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch } from "react-redux";

import { addActiveUserGroupMembership, setSelectedActiveUserGroupMembershipId } from "../../../redux/active-user-group-memberships-slice";
import { GroupMembershipResponse } from "../../../../../src/types/types";
import { useApi } from "../../../hooks/useApi";

export interface CreateGroupArgs {
  name: string;
  onGroupCreated?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: string) => void;
}

export function useCreateGroup() {
  const { apiPost } = useApi();
  const dispatch = useDispatch();

  function createGroup(args: CreateGroupArgs): void {
    const {
      name,
      onGroupCreated,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<GroupMembershipResponse>("/group/create", {
      name,
    })
      .then(({ data }) => {
        dispatch(addActiveUserGroupMembership({
          groupMembership: data,
        }));

        dispatch(setSelectedActiveUserGroupMembershipId({
          id: data?.id,
        }));

        if (onGroupCreated) {
          onGroupCreated();
        }
      })
      .catch(({ response }) => {
        const error = response?.data?.error;

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

  return { createGroup };
}
