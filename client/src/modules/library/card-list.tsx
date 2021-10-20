import React, { useCallback, useState } from "react";

import { Grid } from "@mui/material";

import { LibraryGame } from "../../types";

import { GameDetailDialog } from "../game/game-detail-dialog";

import { LibraryCard } from "./card";

export interface LibraryCardListProps {
  games: LibraryGame[];
}

export function LibraryCardList(props: LibraryCardListProps): React.ReactElement {
  const { games } = props;

  const [gameDetailDialogOpen, setGameDetailDialogOpen] = useState(false);
  const [gameDetails, setGameDetails] = useState<LibraryGame>();

  const closeGameDetailDialog = useCallback(
    () => setGameDetailDialogOpen(false),
    [setGameDetailDialogOpen],
  );

  const openGameDetails = useCallback((game: LibraryGame) => {
    setGameDetails(game);
    setGameDetailDialogOpen(true);
  }, [setGameDetails, setGameDetailDialogOpen]);

  return (
    <>
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid xs={12} sm={6} lg={4} xl={3} key={`library-card-game-bgg-id-${game.bggId}`} item>
            <LibraryCard openGameDetails={openGameDetails} game={game} />
          </Grid>
        ))}
      </Grid>
      <GameDetailDialog
        open={gameDetailDialogOpen}
        onClose={closeGameDetailDialog}
        game={gameDetails}
      />
    </>
  );
}
