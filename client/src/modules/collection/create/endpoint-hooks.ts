/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch } from "react-redux";
import { chunk } from "lodash";

import { CollectionResponse, GameResponse, UserResponse } from "../../../../../src/types/types";
import { useApi } from "../../../hooks/useApi";
import { addActiveUserCollection } from "../../../redux/active-user-collections-slice";
import { useGetLibrary } from "../../library/endpoint-hooks";
// import { useDeleteCollection } from "../delete/endpoint-hooks";

export interface CreateCollectionArgs {
  collectionName: string;
  collectionGames?: GameResponse[];
  collectionOwners?: UserResponse[];
  onCollectionCreated?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useCreateCollection() {
  const { apiPost } = useApi();
  const { getLibrary } = useGetLibrary();
  const dispatch = useDispatch();

  function createCollection(args: CreateCollectionArgs): void {
    const {
      collectionName,
      collectionGames,
      collectionOwners,
      onCollectionCreated,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    apiPost<{ collection: CollectionResponse; }>("/collection/create", {
      name: collectionName,
      games: collectionGames,
      ownerIds: collectionOwners?.map((owner) => owner.id) || [],
    })
      .then(({ data }) => {
        dispatch(addActiveUserCollection({ collection: data.collection }));
        getLibrary({}); // refreshes group library in the background

        if (onCollectionCreated) {
          onCollectionCreated();
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

  return { createCollection };
}

export interface ImportCreateCollectionArgs {
  collectionName: string;
  collectionJson: { games: any[] };
  collectionOwners?: UserResponse[];
  onCollectionWithImportCreated?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  setLoadingProgress?: (value: React.SetStateAction<number>) => void;
  onError?: (error: Error) => void;
}

export function useImportCreateCollection() {
  // New plan:
  //    1. Create collection
  //    2. On success, break up json into arrays of 500?
  //    3. Send each batch as /collection/update/add-games to server
  //    4. Wait for response, on success: update loading progress & send next batch
  //    5. If error on batch, skip batch and note error at the end

  const { apiPost, apiGet } = useApi();
  const { getLibrary } = useGetLibrary();
  const dispatch = useDispatch();

  function importCreateCollection(args: ImportCreateCollectionArgs): void {
    const {
      collectionName,
      collectionJson,
      collectionOwners,
      onCollectionWithImportCreated,
      setIsLoading,
      setLoadingProgress,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    const batchUpdates = async (gamesJSON, collectionId) => {
      // divide games then update in batches
      // const { deleteCollection } = useDeleteCollection();
      const gameBatches = chunk(gamesJSON, 50);
      let updatedCollection = null;
      gameBatches.forEach(async (JSONBatch, index) => {
        await apiPost<{ collection: CollectionResponse; }>("/collection/update/add-games", {
          collectionId,
          json: { games: JSONBatch },
        })
          .then(() => {
            if (setLoadingProgress) {
              setLoadingProgress(index / gameBatches.length);
            }
          })
          .catch((error: Error) => {
            // TODO: Better error handling
            console.log("import collection creation error: ", error);
            // console.log("Rolling back create collection");
            // deleteCollection(collectionId);
            if (onError) {
              onError(error);
            }
          });
      });

      await apiGet<{ collection: CollectionResponse; }>(`/collection/get/${collectionId}`, {
        collectionId,
      })
        .then(({ data }) => {
          updatedCollection = data;
        })
        .catch((error: Error) => {
          // TODO: Better error handling
          console.log("import collection creation error: ", error);
          if (onError) {
            onError(error);
          }
        });

      return updatedCollection;
    };

    apiPost<{ collection: CollectionResponse; }>("/collection/create", {
      name: collectionName,
      ownerIds: collectionOwners?.map((owner) => owner.id) || [],
    })
      .then(async ({ data }) => {
        // start update batches
        const finalCollectionData = await batchUpdates(Array.from(collectionJson?.games), data.collection.id);
        dispatch(addActiveUserCollection({ collection: finalCollectionData }));
        getLibrary({}); // refreshes group library in the background

        if (onCollectionWithImportCreated) {
          onCollectionWithImportCreated();
        }
      })
      .catch((error: Error) => {
        // TODO: Better error handling
        console.log("import create collection error: ", error);
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

  return { importCreateCollection };
}
