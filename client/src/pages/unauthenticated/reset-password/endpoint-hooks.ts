/* eslint-disable no-unused-vars */

import React from "react";

import { useApi } from "../../../hooks/useApi";

export interface ResetPasswordArgs {
  resetPasswordCode: string;
  newPassword: string;
  onPasswordReset?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: string) => void;
}

export interface IsActivePasswordResetCodeArgs {
  resetPasswordCode: string;
  onPasswordResetCodeActiveStatusReceived?: (isActive: boolean) => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: string) => void;
}

export function useResetPassword() {
  const { apiPost } = useApi();

  function resetPassword(props: ResetPasswordArgs): void {
    const {
      resetPasswordCode,
      newPassword,
      onPasswordReset,
      setIsLoading,
      onError,
    } = props;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost("/account/reset-password", {
      resetPasswordCode,
      newPassword,
    })
      .then(() => {
        if (onPasswordReset) {
          onPasswordReset();
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

  function isActivePasswordResetCode(props: IsActivePasswordResetCodeArgs): void {
    const {
      resetPasswordCode,
      onPasswordResetCodeActiveStatusReceived,
      setIsLoading,
      onError,
    } = props;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost("/account/reset-password", {
      resetPasswordCode,
    })
      .then(() => {
        if (onPasswordResetCodeActiveStatusReceived) {
          onPasswordResetCodeActiveStatusReceived(true);
        }
      })
      .catch(({ response }) => {
        const error = response?.data?.error;

        if (onPasswordResetCodeActiveStatusReceived) {
          onPasswordResetCodeActiveStatusReceived(false);
        }

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

  return { resetPassword, isActivePasswordResetCode };
}
