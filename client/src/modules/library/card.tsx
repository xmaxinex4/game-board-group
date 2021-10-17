/* eslint-disable no-unused-vars */

import React, { useCallback } from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ZoomInTwoToneIcon from "@mui/icons-material/ZoomInTwoTone";
import { makeStyles } from "@mui/styles";

import { LibraryGame } from "./types";

export interface LibraryCardProps {
  game: LibraryGame;
  openGameDetails: (game: LibraryGame) => void;
}

const useStyles = makeStyles(() => ({
  card: {
    minWidth: "250px",
    minHeight: "250px",
    boxShadow: "10px 10px 10px rgb(95, 77, 99)",
    cursor: "pointer",
  },
  cardTextContainer: {
    paddingLeft: "24px",
    paddingRight: "24px",
  },
  cardText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export function LibraryCard(props: LibraryCardProps): React.ReactElement {
  const { game, openGameDetails } = props;

  const { card, cardText, cardTextContainer } = useStyles();

  const openGameDetailsDisplay = useCallback(() => {
    openGameDetails(game);
  }, [openGameDetails, game]);

  return (
    <Card
      onClick={openGameDetailsDisplay}
      className={card}
    >
      <CardMedia
        component="img"
        height="175"
        image={game.urlImage || ""}
        alt="game image"
      />
      <CardContent>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={cardTextContainer}
        >
          <Grid item xs={11}>
            <Typography noWrap variant="h6" className={cardText}>{game.name}</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton size="large" color="primary" aria-label="flip card" component="span">
              <ZoomInTwoToneIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
