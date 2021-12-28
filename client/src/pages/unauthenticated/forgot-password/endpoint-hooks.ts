/* eslint-disable no-unused-vars */

import React from "react";

import { useApi } from "../../../hooks/useApi";

export interface SendForgotPasswordEmailArgs {
  email: string;
  onEmailSent?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: string) => void;
}

export function useSendForgotPasswordEmail() {
  const { apiPost } = useApi();

  function sendForgotPasswordEmail(props: SendForgotPasswordEmailArgs): void {
    const {
      email,
      onEmailSent,
      setIsLoading,
      onError,
    } = props;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost("/account/send-reset-password-email", {
      email
    })
      .then(() => {
        if (onEmailSent) {
          onEmailSent();
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

  return { sendForgotPasswordEmail };
}
