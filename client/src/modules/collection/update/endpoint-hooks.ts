/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch } from "react-redux";

import { CollectionResponse, GameResponse, UserResponse } from "../../../../../src/types/types";
import { useApi } from "../../../hooks/useApi";
import { addActiveUserCollection, updateActiveUserCollection } from "../../../redux/active-user-collections-slice";
import { useGetLibrary } from "../../library/endpoint-hooks";

export interface UpdateCollectionNameArgs {
  collectionId: string;
  collectionName: string;
  onCollectionUpdated?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useUpdateCollectionName() {
  const { apiPost } = useApi();
  const { getLibrary } = useGetLibrary();
  const dispatch = useDispatch();

  function updateCollectionName(args: UpdateCollectionNameArgs): void {
    const {
      collectionId,
      collectionName,
      onCollectionUpdated,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<{ collection: CollectionResponse; }>("/collection/update/name", {
      collectionId,
      name: collectionName,
    })
      .then(({ data }) => {
        if (collectionId) {
          dispatch(updateActiveUserCollection({ collection: data.collection }));
        } else {
          dispatch(addActiveUserCollection({ collection: data.collection }));
        }

        getLibrary({}); // refreshes group library in the background

        if (onCollectionUpdated) {
          onCollectionUpdated();
        }
      })
      .catch((error: Error) => {
        // TODO: Better error handling
        console.log("update collection name error: ", error);
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

  return { updateCollectionName };
}

export interface UpdateCollectionOwnersArgs {
  collectionId: string;
  collectionOwners?: UserResponse[];
  onCollectionUpdated?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

// /api/collection/update/owners
export function useUpdateCollectionOwners() {
}

export interface UpdateCollectionDeleteGamesArgs {
  collectionId: string;
  collectionGames: GameResponse[];
  onCollectionUpdated?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

// /api/collection/update/delete-games
export function useUpdateCollectionDeleteGames() {
}

export interface UpdateCollectionAddGamesArgs {
  collectionId: string;
  collectionGames: GameResponse[];
  onCollectionUpdated?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

// /api/collection/update/add-games
export function useUpdateCollectionAddGames() {
}
