import React from "react";

import { Grid, Typography } from "@mui/material";

import { ActiveGroupContext } from "../../contexts/active-group-context";

export function Stats(): React.ReactElement {
  const activeGroupContext = React.useContext(ActiveGroupContext);

  return (
    <Grid container>
      <Typography>
        {activeGroupContext?.activeGroup?.name}
        Stats
      </Typography>
    </Grid>
  );
}
