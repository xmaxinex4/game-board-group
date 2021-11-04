/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch } from "react-redux";

import { UserPlayPreferenceResponse } from "../../../../../src/types/types";
import { deleteActiveUserPlayPreference, upsertActiveUserPlayPreference } from "../../../redux/active-user-play-preferences-slice";
import { useApi } from "../../../hooks/useApi";

export interface UpsertUserGamePlayPreferenceArgs {
  gamePlayPreference: Omit<UserPlayPreferenceResponse, "id"> & { id?: string; };
  onUserGamePlayPreferenceUpserted?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export interface DeleteUserGamePlayPreferenceArgs {
  gamePlayPreferenceId: string;
  onUserGamePlayPreferenceDeleted?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useUpsertUserGamePlayPreference() {
  const { apiPost } = useApi();

  const dispatch = useDispatch();

  function upsertUserGamePlayPreference(args: UpsertUserGamePlayPreferenceArgs): void {
    const {
      gamePlayPreference,
      onUserGamePlayPreferenceUpserted,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<UserPlayPreferenceResponse>("/user/play-preference/upsert", {
      id: gamePlayPreference.id,
      preference: gamePlayPreference.preference,
      bggId: gamePlayPreference.game.bggId,
    })
      .then(({ data }) => {
        dispatch(upsertActiveUserPlayPreference({
          playPreference: data,
        }));

        if (onUserGamePlayPreferenceUpserted) {
          onUserGamePlayPreferenceUpserted();
        }
      })
      .catch((error: Error) => {
        // TODO: Better error handling
        console.log("upsert user game play preference error: ", error);
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

  function deleteUserGamePlayPreference(args: DeleteUserGamePlayPreferenceArgs): void {
    const {
      gamePlayPreferenceId,
      onUserGamePlayPreferenceDeleted,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<UserPlayPreferenceResponse>("/user/play-preference/delete", {
      id: gamePlayPreferenceId,
    })
      .then(({ data }) => {
        dispatch(deleteActiveUserPlayPreference({
          playPreferenceId: data.id,
        }));

        if (onUserGamePlayPreferenceDeleted) {
          onUserGamePlayPreferenceDeleted();
        }
      })
      .catch((error: Error) => {
        // TODO: Better error handling
        console.log("delete user game play preference error: ", error);
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

  return { upsertUserGamePlayPreference, deleteUserGamePlayPreference };
}
