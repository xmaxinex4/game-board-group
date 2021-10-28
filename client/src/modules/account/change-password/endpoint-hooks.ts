/* eslint-disable no-unused-vars */

import React from "react";

import { ActiveUserResponse } from "../../../../../src/types/types";
import { useApi } from "../../../hooks/useApi";

export interface ChangePasswordArgs {
  currentPassword: string;
  newPassword: string;
  onPasswordChanged?: (activeUser: ActiveUserResponse) => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useChangePassword() {
  const { apiPost } = useApi();

  function changePassword(args: ChangePasswordArgs): void {
    const {
      currentPassword,
      newPassword,
      onPasswordChanged,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<ActiveUserResponse>("/account/change-password", {
      currentPassword,
      newPassword,
    })
      .then(({ data }) => {
        if (onPasswordChanged) {
          onPasswordChanged(data);
        }
      })
      .catch((error) => {
        // TODO: Better error handling
        console.log("change password error: ", error);
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

  return { changePassword };
}
