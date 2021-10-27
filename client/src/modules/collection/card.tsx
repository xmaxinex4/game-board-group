/* eslint-disable no-unused-vars */

import React, { useCallback, useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/EditTwoTone";
import RefreshIcon from "@mui/icons-material/SyncRounded";
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";

import { CollectionResponse } from "../../../../src/types/types";

import { GamesStateContext } from "../../contexts/upsert-games-state-context";
import { PaddedCard } from "../common/layout/padded-card";
import { UserCircleListDisplay } from "../user/user-circle-list-display";
import { GameCircleListDisplay } from "../game/game-circle-list-display";
import { ActionButtons } from "../common/button/action-buttons";
import { useDeleteCollection } from "./delete/endpoint-hooks";

export interface CollectionCardProps {
  collection: CollectionResponse;
  onEdit: (collection: CollectionResponse) => void;
}

export function CollectionCard(props: CollectionCardProps): React.ReactElement {
  const { collection, onEdit } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [lastOwnerDeleteModalOpen, setLastOwnerDeleteModalOpen] = useState(false);
  const [removingOwnerFromListModalOpen, setRemovingOwnerFromListModalOpen] = useState(false);
  const { deleteCollection } = useDeleteCollection();

  const closeLastOwnerDeleteModalOpen = useCallback(() => {
    setLastOwnerDeleteModalOpen(false);
  }, []);

  const closeRemovingOwnerFromListModalOpen = useCallback(() => {
    setRemovingOwnerFromListModalOpen(false);
  }, []);

  const onDeleteCollection = useCallback(() => {
    deleteCollection({
      collectionId: collection.id,
      onCollectionDeleted: () => {
        // TODO: remove from redux
        closeLastOwnerDeleteModalOpen();
        closeRemovingOwnerFromListModalOpen();
      },
      setIsLoading,
    });
  }, [collection, closeLastOwnerDeleteModalOpen, closeRemovingOwnerFromListModalOpen, setIsLoading]);

  const verifyDelete = useCallback(() => {
    const isLastOwner = collection.owners.length < 2;

    if (isLastOwner) {
      setLastOwnerDeleteModalOpen(true);
    } else {
      setRemovingOwnerFromListModalOpen(true);
    }
  }, [collection, setLastOwnerDeleteModalOpen, setRemovingOwnerFromListModalOpen]);

  // const refreshCollection = useCallback(() => {
  //   setIsLoading(true);

  //   apiGet<{ collection: CollectionResponse; }>("/collection", {
  //     collectionId: collection.id,
  //   })
  //     .then(({ data }) => {
  //       console.log("data: ", data);
  //     })
  //     .catch(() => {
  //       setError("Oops! Something went wrong.");
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  const editCollection = useCallback(() => {
    onEdit(collection);
  }, [onEdit]);

  return (
    <>
      <PaddedCard styleProps={{ innerPadding: 3 }}>
        <Grid container spacing={2}>
          <Grid container item alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1">{collection.name}</Typography>
            </Grid>
            <Grid container alignItems="flex-end" justifyContent="space-between" item xs={3}>
              <Grid item>
                <IconButton onClick={editCollection} disabled={isLoading} color="primary" aria-label="edit collection" component="span">
                  <EditIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => console.log("Refresh")}
                  disabled={isLoading}
                  color="primary"
                  aria-label="refresh collection"
                  component="span"
                >
                  <RefreshIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={verifyDelete} disabled={isLoading} color="primary" aria-label="delete collection" component="span">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid container item alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="subtitle2">Games:</Typography>
              </Grid>
              <Grid item>
                <GamesStateContext.Provider value={{ games: collection.games, setGames: undefined }}>
                  <GameCircleListDisplay />
                </GamesStateContext.Provider>
              </Grid>
            </Grid>
            <Grid container item alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="subtitle2">Owners:</Typography>
              </Grid>
              <Grid item>
                <GamesStateContext.Provider value={{ games: collection.games, setGames: undefined }}>
                  <UserCircleListDisplay users={collection.owners} />
                </GamesStateContext.Provider>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PaddedCard>
      <Dialog
        onClose={closeLastOwnerDeleteModalOpen}
        open={lastOwnerDeleteModalOpen}
        sx={{ ".MuiDialog-container": { marginTop: "64px", height: "unset" } }}
      >
        <DialogContent>
          <Typography>
            You are the last owner of this collection.
            Removing this collection will completely delete it and cannot be undone.
            Are you sure you want to delete this collection?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: "24px", paddingTop: "16px" }}>
          <ActionButtons
            onSave={onDeleteCollection}
            saveButtonProps={{ disabled: isLoading, color: "error" }}
            saveText="Delete"
            onCancel={closeLastOwnerDeleteModalOpen}
            cancelButtonProps={{ disabled: isLoading }}
          />
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={closeRemovingOwnerFromListModalOpen}
        open={removingOwnerFromListModalOpen}
        sx={{ ".MuiDialog-container": { marginTop: "64px", height: "unset" } }}
      >
        <DialogContent>
          <Typography>
            There are other owners in this collection.
            You will be removed from the collection, but the collection will not be completely deleted.
            Are you sure you want to remove this collection from your list?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: "24px", paddingTop: "16px" }}>
          <ActionButtons
            onSave={onDeleteCollection}
            saveButtonProps={{ disabled: isLoading, color: "error" }}
            saveText="Remove From My Collections"
            onCancel={closeRemovingOwnerFromListModalOpen}
            cancelButtonProps={{ disabled: isLoading }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
