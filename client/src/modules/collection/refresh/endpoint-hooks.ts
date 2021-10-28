/* eslint-disable no-unused-vars */

import React from "react";
import { CollectionResponse } from "../../../../../src/types/types";

import { useApi } from "../../../hooks/useApi";

export interface RefreshCollectionArgs {
  collectionId: string;
  onCollectionRetrieved?: (collection: CollectionResponse) => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useRefreshCollection() {
  const { apiGet } = useApi();

  function refreshCollection(args: RefreshCollectionArgs): void {
    const {
      collectionId,
      onCollectionRetrieved,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiGet<{ collection: CollectionResponse; }>(`/collection/${collectionId}`, {
      collectionId,
    })
      .then(({ data }) => {
        if (onCollectionRetrieved) {
          onCollectionRetrieved(data.collection);
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

  return { refreshCollection };
}
