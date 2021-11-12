/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { LibraryReponse } from "../../../../src/types/types";
import { setActiveUserGroupLibrary } from "../../redux/active-user-group-library-slice";
import { selectedActiveUserGroupMembership } from "../../redux/active-user-group-memberships-slice";
import { useApi } from "../../hooks/useApi";

export interface GetLibraryArgs {
  onLibraryRetrieved?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useGetLibrary() {
  const activeGroupMembership = useSelector(selectedActiveUserGroupMembership);

  const { apiGet } = useApi();
  const dispatch = useDispatch();

  function getLibrary(args: GetLibraryArgs): void {
    const {
      onLibraryRetrieved,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiGet<LibraryReponse>("/library", { groupId: activeGroupMembership?.group.id })
      .then(({ data }) => {
        dispatch(setActiveUserGroupLibrary({
          newLibrary: data,
        }));

        if (onLibraryRetrieved) {
          onLibraryRetrieved();
        }
      })
      .catch((error: Error) => {
        // TODO: Better error handling
        console.log("getting library error: ", error);
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

  return { getLibrary };
}
