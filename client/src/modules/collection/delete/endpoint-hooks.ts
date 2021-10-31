/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch } from "react-redux";

import { useApi } from "../../../hooks/useApi";
import { deleteActiveUserCollection } from "../../../redux/active-user-collections-slice";

export interface DeleteCollectionArgs {
  collectionId: string;
  onCollectionDeleted?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useDeleteCollection() {
  const { apiPost } = useApi();
  const dispatch = useDispatch();

  function deleteCollection(args: DeleteCollectionArgs): void {
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
          dispatch(deleteActiveUserCollection({ collectionId: data.deletedCollectionId }));
          onCollectionDeleted();
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
