import React from "react";

import { Grid, Typography } from "@mui/material";

import { ActiveGroupContext } from "../../contexts/active-group-context";

export const Stats: React.FunctionComponent = () => {
  const activeGroupContext = React.useContext(ActiveGroupContext);

  return (
    <Grid container>
      <Typography>
        {activeGroupContext?.activeGroup?.name}
        Stats
      </Typography>
    </Grid>
  );
};
