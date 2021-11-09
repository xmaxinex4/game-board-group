import React from "react";

import {
  Grid,
  Typography,
} from "@mui/material";

import { GameCircleListDisplay } from "./game-circle-list-display";
import { GameSearchTypeahead } from "./game-search-typeahead";

export interface AddGamesFormProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export function GamesFormBody(props: AddGamesFormProps): React.ReactElement {
  const { isActive, setIsActive } = props;

  return (
    <Grid container direction="column" spacing={2}>
      <Grid container item alignItems="center">
        <Grid item xs={11}>
          <Typography color={isActive ? "primary.main" : ""} variant="subtitle1">Add Games</Typography>
        </Grid>
      </Grid>
      <Grid item sx={{ width: "100%" }}>
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <Grid item sx={{ width: "100%" }}>
            <GameSearchTypeahead isFocused={isActive} setIsFocused={setIsActive} />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <GameCircleListDisplay canDelete />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
