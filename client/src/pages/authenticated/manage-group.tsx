import React from "react";

import { Grid, Typography } from "@mui/material";

import { ActiveGroupContext } from "../../contexts/active-group-context";

export function ManageGroup(): React.ReactElement {
  const activeGroupContext = React.useContext(ActiveGroupContext);

  return (
    <Grid container>
      <Typography>
        {`Managing ${activeGroupContext?.activeGroup?.name}`}
      </Typography>
    </Grid>
  );
}
