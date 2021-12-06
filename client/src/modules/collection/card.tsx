/* eslint-disable no-unused-vars */

import React, {
  lazy,
  Suspense,
  useCallback,
  useState,
} from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  Theme,
  useTheme,
} from "@mui/material";

import EditIcon from "@mui/icons-material/EditTwoTone";
import RefreshIcon from "@mui/icons-material/SyncRounded";
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";

import { CollectionResponse } from "../../../../src/types/types";

import { GamesStateContext } from "../../contexts/upsert-games-state-context";
import { PaddedCard } from "../common/layout/padded-card";
import { UserCircleListDisplay } from "../user/user-circle-list-display";
import { ActionButtons } from "../common/button/action-buttons";

import { useDeleteCollection } from "./delete/endpoint-hooks";
import { useRefreshCollections } from "./refresh/endpoint-hooks";
import { MobileMoreActionsButton } from "./mobile-more-actions-button";
import { PageLoadingSpinner } from "../common/progress/page-loading-spinner";

const GameCircleListDisplay = lazy(() => import("../game/game-circle-list-display")
  .then((module) => ({ default: module.GameCircleListDisplay })));

export interface CollectionCardProps {
  collection: CollectionResponse;
  onEdit: (collection: CollectionResponse) => void;
}

export function CollectionCard(props: CollectionCardProps): React.ReactElement {
  const { collection, onEdit } = props;
  const theme = useTheme<Theme>();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [isLoading, setIsLoading] = useState(false);
  const [lastOwnerDeleteModalOpen, setLastOwnerDeleteModalOpen] = useState(false);
  const [removingOwnerFromListModalOpen, setRemovingOwnerFromListModalOpen] = useState(false);

  const { deleteCollection } = useDeleteCollection();
  const { refreshCollection } = useRefreshCollections();

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

  const onRefreshCollection = useCallback(() => {
    refreshCollection({
      collectionId: collection.id,
      setIsLoading,
    });
  }, [collection, setIsLoading]);

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
            {isMdUp && (
              <Grid container alignItems="flex-end" justifyContent="space-between" item xs={3}>
                <Grid item>
                  <IconButton onClick={editCollection} disabled={isLoading} color="primary" aria-label="edit collection" component="span">
                    <EditIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={onRefreshCollection}
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
            )}
            {!isMdUp && (
              <MobileMoreActionsButton isLoading={isLoading} onEdit={editCollection} onRefresh={onRefreshCollection} onDelete={verifyDelete} />
            )}
          </Grid>
          <Grid container item spacing={4}>
            {isLoading && (
              <PageLoadingSpinner />
            )}
            {!isLoading && (
              <Suspense fallback={<PageLoadingSpinner />}>
                <Grid container item alignItems="center" spacing={2}>
                  <Grid item>
                    <Typography variant="subtitle2">Games:</Typography>
                  </Grid>
                  <Grid item>
                    <GamesStateContext.Provider value={{ games: collection.games.map((collectionGame) => collectionGame.game), setGames: undefined }}>
                      <GameCircleListDisplay />
                    </GamesStateContext.Provider>
                  </Grid>
                </Grid>
                <Grid container item alignItems="center" spacing={2}>
                  <Grid item>
                    <Typography variant="subtitle2">Owners:</Typography>
                  </Grid>
                  <Grid item>
                    <GamesStateContext.Provider value={{ games: collection.games.map((collectionGame) => collectionGame.game), setGames: undefined }}>
                      <UserCircleListDisplay users={collection.owners} />
                    </GamesStateContext.Provider>
                  </Grid>
                </Grid>
              </Suspense>
            )}
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
            saveButtonProps={{ disabled: isLoading }}
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
            Are you sure you want to be removed from this collection?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: "24px", paddingTop: "16px" }}>
          <ActionButtons
            onSave={onDeleteCollection}
            saveButtonProps={{ disabled: isLoading }}
            saveText="Remove From My Collections"
            onCancel={closeRemovingOwnerFromListModalOpen}
            cancelButtonProps={{ disabled: isLoading }}
            saveButtonSize={7}
            cancelButtonSize={3}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
