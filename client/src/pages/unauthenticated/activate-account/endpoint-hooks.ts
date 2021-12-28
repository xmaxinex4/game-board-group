/* eslint-disable no-unused-vars */

import React from "react";

import { useApi } from "../../../hooks/useApi";

export interface ActivateAccountArgs {
  activationCode: string;
  onAccountActivated?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: string) => void;
}

export function useAccountActivate() {
  const { apiPost } = useApi();

  function activateAccount(props: ActivateAccountArgs): void {
    const {
      activationCode,
      onAccountActivated,
      setIsLoading,
      onError,
    } = props;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<{ token: string; }>("/account/activate", {
      activationCode,
    })
      .then(({ data }) => {
        localStorage.setItem("auth-token", data?.token);

        if (onAccountActivated) {
          onAccountActivated();
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

  return { activateAccount };
}
