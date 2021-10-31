/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch } from "react-redux";

import { CollectionResponse, GameResponse, UserResponse } from "../../../../../src/types/types";
import { useApi } from "../../../hooks/useApi";
import { addActiveUserCollection, updateActiveUserCollection } from "../../../redux/active-user-collections-slice";

export interface UpsertCollectionArgs {
  collectionId?: string;
  collectionName: string;
  collectionGames?: GameResponse[];
  collectionOwners?: UserResponse[];
  onCollectionUpserted?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useUpsertCollection() {
  const { apiPost } = useApi();
  const dispatch = useDispatch();

  function upsertCollection(args: UpsertCollectionArgs): void {
    const {
      collectionId,
      collectionName,
      collectionGames,
      collectionOwners,
      onCollectionUpserted,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<{ collection: CollectionResponse; }>("/collection/upsert", {
      collectionId,
      name: collectionName,
      games: collectionGames,
      ownerIds: collectionOwners?.map((owner) => owner.id) || [],
    })
      .then(({ data }) => {
        if (collectionId) {
          dispatch(updateActiveUserCollection({ collection: data.collection }));
        } else {
          dispatch(addActiveUserCollection({ collection: data.collection }));
        }

        if (onCollectionUpserted) {
          onCollectionUpserted();
        }
      })
      .catch((error: Error) => {
        // TODO: Better error handling
        console.log("create collection error: ", error);
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

  return { upsertCollection };
}
