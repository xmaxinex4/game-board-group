/* eslint-disable no-unused-vars */

import React from "react";

import { CollectionResponse, GameResponse, UserResponse } from "../../../../../src/types/types";
import { useApi } from "../../../hooks/useApi";

export interface UpsertCollectionArgs {
  collectionId?: string;
  collectionName: string;
  collectionGames?: GameResponse[];
  collectionOwners?: UserResponse[];
  onCollectionUpserted?: (collection: CollectionResponse) => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useUpsertCollection() {
  const { apiPost } = useApi();

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
        if (onCollectionUpserted) {
          onCollectionUpserted(data.collection);
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
