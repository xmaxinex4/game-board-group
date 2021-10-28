/* eslint-disable no-unused-vars */
import React from "react";

import { Color } from ".prisma/client";

import { ActiveUserResponse } from "../../../../../src/types/types";
import { useApi } from "../../../hooks/useApi";

export interface EditAccountArgs {
  color: Color;
  username: string;
  onAccountEdited?: (activeUser: ActiveUserResponse) => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useEditAccount() {
  const { apiPost } = useApi();

  function editAccount(args: EditAccountArgs): void {
    const {
      color,
      username,
      onAccountEdited,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<ActiveUserResponse>("/account/edit", {
      color,
      username,
    })
      .then(({ data }) => {
        if (onAccountEdited) {
          onAccountEdited(data);
        }
      })
      .catch((error) => {
        // TODO: Better error handling
        console.log("edit account error: ", error);
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

  return { editAccount };
}
