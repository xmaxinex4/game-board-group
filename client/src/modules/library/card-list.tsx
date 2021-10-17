import React from "react";

import { Grid } from "@mui/material";

import { LibraryCard } from "./card";
import { LibraryGame } from "./types";

export interface LibraryCardListProps {
  games: LibraryGame[];
}

export function LibraryCardList(props: LibraryCardListProps): React.ReactElement {
  const { games } = props;

  return (
    <Grid container spacing={3}>
      {games.map((game) => (
        <Grid xs={12} md={6} lg={4} key={`library-card-game-bgg-id-${game.bggId}`} item>
          <LibraryCard game={game} />
        </Grid>
      ))}
    </Grid>
  );
}
