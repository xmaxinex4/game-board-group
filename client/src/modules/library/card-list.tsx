import React, { useCallback, useState } from "react";

import {
  Grid,
  useMediaQuery,
  Theme,
  useTheme,
} from "@mui/material";

import { LibraryGame } from "../../../../src/types/types";
import { GameDetailDialog } from "../game/game-detail-dialog";
import { LibraryCard } from "./card";
import { SmallLibraryCard } from "./small-card";

export interface LibraryCardListProps {
  games: LibraryGame[];
  size?: "small";
}

export function LibraryCardList(props: LibraryCardListProps): React.ReactElement {
  const { games, size } = props;
  const theme = useTheme<Theme>();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

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
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        {games.map((game) => (
          size === "small" || isMdDown ? (
            <Grid key={`library-card-game-bgg-id-${game.bggId}`} item>
              <SmallLibraryCard openGameDetails={openGameDetails} game={game} />
            </Grid>
          ) : (
            <Grid xs={12} sm={6} lg={4} xl={3} key={`library-card-game-bgg-id-${game.bggId}`} item>
              <LibraryCard openGameDetails={openGameDetails} game={game} />
            </Grid>
          )
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
