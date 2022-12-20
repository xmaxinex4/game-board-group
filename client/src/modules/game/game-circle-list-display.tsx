import React, { useCallback, useContext } from "react";

import PencilIcon from "@mui/icons-material/EditTwoTone";

import {
  Avatar,
  Grid,
  Tooltip,
  IconButton,
  Theme,
  Chip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { GamesStateContext } from "../../contexts/games-state-context";

export interface GameCircleListDisplayProps {
  onEditGames?: () => void;
  canDelete?: boolean;
}

const useStyles = makeStyles<Theme>((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export function GameCircleListDisplay(props: GameCircleListDisplayProps): React.ReactElement {
  const { onEditGames, canDelete } = props;
  const { games, setGames } = useContext(GamesStateContext);
  const classes = useStyles();

  const onDelete = useCallback((bggId: string) => {
    const newGames = games?.filter((game) => game.bggId !== bggId);
    if (setGames && newGames) {
      setGames(newGames);
    }
  }, [games, setGames]);

  return (
    <Grid container spacing={2} alignItems="center">
      {games && games.map((game) => (
        <Grid item key={`game-circle-display-game-id-${game.bggId}`}>
          <>
            {canDelete && (
              <Chip
                sx={{ maxWidth: { xs: "200px", sm: "500px" } }}
                label={game.name}
                onDelete={() => onDelete(game.bggId)}
                avatar={<Avatar alt={game.name} src={game.urlThumb || undefined} className={classes.large} />}
              />
            )}
            {!canDelete && (
              <Tooltip title={game.name} aria-label={game.name}>
                <Avatar alt={game.name} src={game.urlThumb || undefined} className={classes.large} />
              </Tooltip>
            )}
          </>
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
