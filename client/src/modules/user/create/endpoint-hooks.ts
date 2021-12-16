/* eslint-disable no-unused-vars */

import React from "react";

import { useApi } from "../../../hooks/useApi";

export interface CreateUserArgs {
  color: string;
  email: string;
  password: string;
  username: string;
  onUserCreated?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: string) => void;
}

export function useCreateUser() {
  const { apiPost } = useApi();

  function createUser(props: CreateUserArgs): void {
    const {
      color,
      email,
      password,
      username,
      onUserCreated,
      setIsLoading,
      onError,
    } = props;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost("/user/create", {
      color,
      email: email.toLowerCase(),
      password,
      username,
    })
      .then(() => {
        // activation link sent, account created but set to inactive
        if (onUserCreated) {
          onUserCreated();
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

  return { createUser };
}
