/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch } from "react-redux";

import { UserMembershipResponse } from "../../../../../src/types/types";
import { useApi } from "../../../hooks/useApi";
import { transferOwnershipOfActiveUserGroup } from "../../../redux/active-user-group-memberships-slice";

export interface TransferGroupMembershipArgs {
  newOwnerGroupMembershipId: string,
  onTransferred?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: string) => void;
}

export function useTransferGroupOwnership() {
  const { apiPost } = useApi();
  const dispatch = useDispatch();

  function transferGroupOwnership(args: TransferGroupMembershipArgs): void {
    const {
      newOwnerGroupMembershipId,
      onTransferred,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<UserMembershipResponse>("/group/transfer-ownership", {
      groupMembershipId: newOwnerGroupMembershipId,
    })
      .then(({ data }) => {
        dispatch(transferOwnershipOfActiveUserGroup({
          newOwnerGroupMembershipId: data.id,
        }));

        if (onTransferred) {
          onTransferred();
        }
      })
      .catch(({ response }) => {
        const error = response?.data?.error;

        if (onError) {
          onError(error);
        }

        if (setIsLoading) {
          setIsLoading(false);
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

  return { transferGroupOwnership };
}
