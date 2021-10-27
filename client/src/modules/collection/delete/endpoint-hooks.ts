/* eslint-disable no-unused-vars */

import React from "react";

import { useApi } from "../../../hooks/useApi";

export interface UpsertCollectionArgs {
  collectionId: string;
  onCollectionDeleted?: (collectionId: string) => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useDeleteCollection() {
  const { apiPost } = useApi();

  function deleteCollection(args: UpsertCollectionArgs): void {
    const {
      collectionId,
      onCollectionDeleted,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<{ deletedCollectionId: string; }>("/collection/delete", {
      collectionId,
    })
      .then(({ data }) => {
        if (onCollectionDeleted) {
          onCollectionDeleted(data.deletedCollectionId);
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

  return { deleteCollection };
}
