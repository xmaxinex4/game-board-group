import React from "react";

import {
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/EditTwoTone";
import RefreshIcon from "@mui/icons-material/SyncRounded";
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";

import { Collection, Game, User } from ".prisma/client";
import { GameCircleListDisplay } from "../game/game-circle-list-display";
import { GamesStateContext } from "../../contexts/upsert-games-state-context";
import { PaddedCard } from "../common/layout/padded-card";
import { UserCircleListDisplay } from "../user/user-circle-list-display";

export interface CollectionCardProps {
  collection: Pick<Collection, "name" | "id"> & { games: Game[]; owners: User[]; };
}

export function CollectionCard(props: CollectionCardProps): React.ReactElement {
  const { collection } = props;

  return (
    <PaddedCard styleProps={{ innerPadding: 3 }}>
      <Grid container spacing={2}>
        <Grid container item alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="subtitle1">{collection.name}</Typography>
          </Grid>
          <Grid container alignItems="flex-end" justifyContent="space-between" item xs={3}>
            <Grid item>
              <IconButton color="primary" aria-label="edit collection" component="span">
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="primary" aria-label="refresh collection" component="span">
                <RefreshIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="primary" aria-label="delete collection" component="span">
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
  );
}
