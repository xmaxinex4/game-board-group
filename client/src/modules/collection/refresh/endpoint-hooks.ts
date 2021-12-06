/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch } from "react-redux";
import { CollectionResponse, CollectionsResponse } from "../../../../../src/types/types";

import { useApi } from "../../../hooks/useApi";
import { setActiveUserCollections, updateActiveUserCollection } from "../../../redux/active-user-collections-slice";
import { useGetLibrary } from "../../library/endpoint-hooks";

export interface RefreshCollectionArgs {
  collectionId: string;
  onCollectionRetrieved?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export interface RefreshAllCollectionsArgs {
  onAllCollectionsRetrieved?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useRefreshCollections() {
  const { apiGet } = useApi();
  const dispatch = useDispatch();
  const { getLibrary } = useGetLibrary();

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

    apiGet<{ collection: CollectionResponse; }>(`/collection/get/${collectionId}`, {
      collectionId,
    })
      .then(({ data }) => {
        dispatch(updateActiveUserCollection({ collection: data.collection }));

        if (onCollectionRetrieved) {
          onCollectionRetrieved();
        }
      })
      .catch((error: Error) => {
        // TODO: Better error handling
        console.log("refresh collection error: ", error);
        if (onError) {
          onError(error);
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

  function refreshAllCollections(args: RefreshAllCollectionsArgs): void {
    const {
      onAllCollectionsRetrieved,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiGet<CollectionsResponse>("/collection/my-collections", {
    })
      .then(({ data }) => {
        dispatch(setActiveUserCollections({ collections: data.collections }));
        getLibrary({}); // refreshes group library in the background

        if (onAllCollectionsRetrieved) {
          onAllCollectionsRetrieved();
        }
      })
      .catch((error: Error) => {
        // TODO: Better error handling
        console.log("refresh collections error: ", error);
        if (onError) {
          onError(error);
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

  return { refreshCollection, refreshAllCollections };
}
