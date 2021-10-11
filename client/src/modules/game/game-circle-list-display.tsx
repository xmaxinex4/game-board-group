import React from "react";

import PencilIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Grid,
  Tooltip,
  Typography,
  IconButton,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Game } from "../../api-types/game";

export interface GameCircleListDisplayProps {
  games: Game[];
  onEditGames?: () => void;
}

const useStyles = makeStyles<Theme>((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export function GameCircleListDisplay(props: GameCircleListDisplayProps): React.ReactElement {
  const { games, onEditGames } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Typography>Games:</Typography>
      </Grid>
      {games && games.map((game) => (
        <Grid item>
          <Tooltip title={game.name} aria-label={game.name}>
            <Avatar alt={game.name} src={game.urlThumb || undefined} className={classes.large} />
          </Tooltip>
        </Grid>
      ))}
      {onEditGames && (
        <Grid item>
          <IconButton onClick={onEditGames} color="primary" aria-label="edit games" component="span">
            <PencilIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
}
