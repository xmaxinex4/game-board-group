/* eslint-disable no-unused-vars */

import React, { useCallback } from "react";

import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ZoomInTwoToneIcon from "@mui/icons-material/ZoomInTwoTone";
import HideImageTwoToneIcon from "@mui/icons-material/HideImageTwoTone";
import { makeStyles } from "@mui/styles";

import { LibraryGame } from "../../../../src/types/types";

import { ImageLoader } from "../common/image/image-loader";

export interface SmallLibraryCardProps {
  game: LibraryGame;
  openGameDetails: (game: LibraryGame) => void;
}

const useStyles = makeStyles(() => ({
  cardText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  root: {
    paddingBottom: "unset !important",
    paddingTop: "unset",
    paddingRight: "16px",
    paddingLeft: "16px",
  },
}));

export function SmallLibraryCard(props: SmallLibraryCardProps): React.ReactElement {
  const { game, openGameDetails } = props;

  const {
    cardText,
    root,
  } = useStyles();

  const openGameDetailsDisplay = useCallback(() => {
    openGameDetails(game);
  }, [openGameDetails, game]);

  return (
    <Card
      onClick={openGameDetailsDisplay}
      sx={{
        maxWidth: {
          xs: "115px",
          sm: "150px",
        },
        minWidth: {
          xs: "115px",
          sm: "150px",
        },
        minHeight: "100px",
        boxShadow: "10px 10px 10px rgb(95, 77, 99)",
        cursor: "pointer",
      }}
    >
      {game.urlThumb
        ? (
          <ImageLoader imgSrc={game.urlThumb || ""} imageDimensions={{ height: "100px", width: "100%" }} />
        )
        : (
          <Box display="flex" justifyContent="center" alignItems="center" height="50px" width="100%">
            <HideImageTwoToneIcon color="primary" sx={{ fontSize: 56 }} />
          </Box>
        )}
      <CardContent className={root} sx={{ Muiroot: { paddingBottom: "unset" } }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ paddingRight: "24px" }}
        >
          <Grid item xs={11}>
            <Typography noWrap variant="body2" className={cardText}>{game.name}</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton size="large" color="primary" aria-label="show card details">
              <ZoomInTwoToneIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
