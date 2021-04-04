import * as React from 'react'

import { ActiveUserContext, ActiveGroupContext } from "../Contexts";
import { Grid, Typography } from "@material-ui/core";

export const Stats: React.FunctionComponent = () => {
  const activeUserContext = React.useContext(ActiveUserContext);
  const activeGroupContext = React.useContext(ActiveGroupContext);

  return (
    <Grid container>
      <Typography>{activeGroupContext.activeGroup.name} Stats</Typography>
    </Grid>
  )
}