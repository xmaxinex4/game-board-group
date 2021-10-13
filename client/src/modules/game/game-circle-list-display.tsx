import React, { useContext } from "react";

import PencilIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Grid,
  Tooltip,
  IconButton,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { GamesStateContext } from "../../contexts/games-state-context";

export interface GameCircleListDisplayProps {
  onEditGames?: () => void;
}

const useStyles = makeStyles<Theme>((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export function GameCircleListDisplay(props: GameCircleListDisplayProps): React.ReactElement {
  const { onEditGames } = props;
  const { games } = useContext(GamesStateContext);
  const classes = useStyles();

  console.log("Starting new display for game: ", games);

  return (
    <Grid container spacing={2} alignItems="center">
      {/* <Grid item>
        <Typography>Games:</Typography>
      </Grid> */}
      {games && games.map((game) => (
        <Grid item key={`game-circle-display-game-id-${game.bggId}`}>
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
