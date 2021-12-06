/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch } from "react-redux";

import { ActiveUserGroupMembershipsResponse } from "../../../../../src/types/types";
import { setActiveUserGroupMemberships } from "../../../redux/active-user-group-memberships-slice";
import { useApi } from "../../../hooks/useApi";
import { useGetLibrary } from "../../library/endpoint-hooks";

export interface RefreshAllActiveGroupMembersArgs {
  onAllActiveGroupMembersRetrieved?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useRefreshActiveGroupMembers() {
  const { apiGet } = useApi();
  const dispatch = useDispatch();
  const { getLibrary } = useGetLibrary();

  function refreshAllActiveGroupMembers(args: RefreshAllActiveGroupMembersArgs): void {
    const {
      onAllActiveGroupMembersRetrieved,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiGet<ActiveUserGroupMembershipsResponse>("/user/active-user-group-memberships").then(({ data }) => {
      dispatch(setActiveUserGroupMemberships({
        groupMemberships: data?.groupMemberships,
      }));

      getLibrary({}); // refreshes group library in the background

      if (onAllActiveGroupMembersRetrieved) {
        onAllActiveGroupMembersRetrieved();
      }
    })
      .catch((error: Error) => {
        // TODO: Better error handling
        console.log("refresh group members error: ", error);
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

  return { refreshAllActiveGroupMembers };
}
